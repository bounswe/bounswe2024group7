from SPARQLWrapper import SPARQLWrapper, JSON
import re

sparql = SPARQLWrapper("https://query.wikidata.org/bigdata/namespace/wdq/sparql")
sparql.setReturnFormat(JSON)

def get_creator_sparql(keyword):
    sparql.setQuery(f"""
    SELECT ?itemLabel ?image ?creatorLabel ?genreLabel ?materialLabel
    WHERE {{
        ?item rdfs:label ?itemLabel.
        ?item wdt:P170 wd:{keyword}.
        ?item wdt:P31 wd:Q3305213.
        ?item wdt:P18 ?image.
        ?item wdt:P136 ?genre.
        ?item wdt:P170 ?creator.
        ?item wdt:P186 ?material.
        FILTER(LANG(?itemLabel)="en").
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId).
        SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
    }}
    """ )
    try:
       # for r in sparql.queryAndConvert()["results"]["bindings"]:
        #    print(r["itemLabel"]["value"])
        return sparql.queryAndConvert()["results"]["bindings"] 
    except Exception as e:
        return []

def related_search(keyword):
    creators = set()
    result1 = get_painting_sparql(keyword)
    for ret in result1:
        result = ret["creator"]["value"]
        lst = result.split("http://www.wikidata.org/entity/")
        if len(lst)<2:
            continue
        creators.add(lst[1])
    result2 = get_movement_sparql(keyword)
    for ret in result2:
        result = ret["creator"]["value"]
        lst = result.split("http://www.wikidata.org/entity/")
        if len(lst)<2:
            continue
        creators.add(lst[1])
    result3 = get_genre_sparql(keyword)
    for ret in result3:
        result = ret["creator"]["value"]
        lst = result.split("http://www.wikidata.org/entity/")
        if len(lst)<2:
            continue
        creators.add(lst[1])
    output = []
    for creator in creators:
        result = get_creator_sparql(creator)
        output.extend(result)
    return output
    

def get_painting_sparql(keyword):
    keyword = f"[^a-zA-Z]{keyword}[^a-zA-Z]|^{keyword}[^a-zA-Z]|[^a-zA-Z]{keyword}$|^{keyword}$"
    sparql.setQuery(f"""
    SELECT ?itemLabel ?image ?creatorLabel ?genreLabel ?materialLabel ?creator
    WHERE {{
        ?item rdfs:label ?itemLabel.
        FILTER(REGEX(?itemLabel, "{keyword}"@en, "i")).
        ?item wdt:P31 wd:Q3305213.
        ?item wdt:P18 ?image.
        ?item wdt:P136 ?genre.
        ?item wdt:P170 ?creator.
        ?item wdt:P186 ?material.
        FILTER(LANG(?itemLabel)="en").
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId).

        SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
    }}
    """ )
    try:
       # for r in sparql.queryAndConvert()["results"]["bindings"]:
        #    print(r["itemLabel"]["value"])
        return sparql.queryAndConvert()["results"]["bindings"] 
    except Exception as e:
        return []

def get_movement_sparql(keyword):
    keyword = f"[^a-zA-Z]{keyword}[^a-zA-Z]|^{keyword}[^a-zA-Z]|[^a-zA-Z]{keyword}$|^{keyword}$"
    sparql.setQuery(f"""
    SELECT ?item ?itemLabel ?itemId
    WHERE {{
        ?item rdfs:label ?itemLabel.
        FILTER(REGEX(?itemLabel, "{keyword}","i")).
        ?item wdt:P31 wd:Q968159.
        FILTER(LANG(?itemLabel)="en").
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
    }}
    """ )
    if len(sparql.queryAndConvert()["results"]["bindings"]) != 0:
        lst = []
        possible_ids = sparql.queryAndConvert()["results"]["bindings"]
        for possible_id in possible_ids:
            item_id = possible_id["itemId"]["value"]
            lst.extend(find_paintings(135, item_id))
        return lst
    return []

def get_genre_sparql(keyword):
    keyword = f"[^a-zA-Z]{keyword}[^a-zA-Z]|^{keyword}[^a-zA-Z]|[^a-zA-Z]{keyword}$|^{keyword}$"
    sparql.setQuery(f"""
    SELECT ?item ?itemLabel ?itemId
    WHERE {{
        ?item rdfs:label ?itemLabel.
        FILTER(REGEX(?itemLabel, "{keyword}","i")).
        ?item wdt:P31 wd:Q16743958.
        FILTER(LANG(?itemLabel)="en").
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
    }}
    """ )
    if len(sparql.queryAndConvert()["results"]["bindings"]) != 0:
        lst = []
        possible_ids = sparql.queryAndConvert()["results"]["bindings"]
        for possible_id in possible_ids:
            item_id = possible_id["itemId"]["value"]
            lst.extend(find_paintings(136, item_id))
        return lst
    return []


def find_paintings(search_type, item_id):
    sparql.setQuery(f""" 
    SELECT ?itemLabel ?image ?creatorLabel ?genreLabel ?materialLabel ?creator
    WHERE {{
        ?item rdfs:label ?itemLabel.
        ?item wdt:P{search_type} wd:{item_id}.
        ?item wdt:P31 wd:Q3305213.
        FILTER(LANG(?itemLabel)="en").
        ?item wdt:P18 ?image.
        ?item wdt:P136 ?genre.
        ?item wdt:P170 ?creator.
        ?item wdt:P186 ?material.
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
        SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
    }}""")
    try:
        return sparql.queryAndConvert()["results"]["bindings"]
    except Exception as e:
        return []
def test():
    while True:
        keyword = input("Search something : ")
        if keyword=="quit":
            break
        else:
            ret = related_search(keyword)
            for r in ret:
                print("Item Label : "+r["itemLabel"]["value"])
                print("Creator : "+r["creatorLabel"]["value"])
                print("Material : "+r["materialLabel"]["value"])
                print("Genre : "+r["genreLabel"]["value"])
            '''ret = get_painting_sparql(keyword)
            print("Results by name : \n")
            for r in ret:
                print("Item Label:"+"-"+r["itemLabel"]["value"])
                print("Creator:"+"-"+r["creatorLabel"]["value"])
                print("Material:"+"-"+r["materialLabel"]["value"])
                print("Genre:"+"-"+r["genreLabel"]["value"])
                print("Creator value:"+"-"+r["creator"])
            ret = get_movement_sparql(keyword)
            print("Results by movement : \n")
            for r in ret:
                print("Item Label:"+"-"+r["itemLabel"]["value"])
                print("Creator:"+"-"+r["creatorLabel"]["value"])
                print("Material:"+"-"+r["materialLabel"]["value"])
                print("Genre:"+"-"+r["genreLabel"]["value"])
            print("Results by genre : \n")
            ret = get_genre_sparql(keyword)
            for r in ret:
                print("Item Label:"+"-"+r["itemLabel"]["value"])
                print("Creator:"+"-"+r["creatorLabel"]["value"])
                print("Material:"+"-"+r["materialLabel"]["value"])
                print("Genre:"+"-"+r["genreLabel"]["value"])'''
            

#Uncomment the row below to test the semantic search feature
#test()  