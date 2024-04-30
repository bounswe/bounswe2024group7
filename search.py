from SPARQLWrapper import SPARQLWrapper, JSON

sparql = SPARQLWrapper("https://query.wikidata.org/bigdata/namespace/wdq/sparql")
sparql.setReturnFormat(JSON)
import re

def get_painting_sparql(keyword):
    keyword = f"[^a-zA-Z]{keyword}[^a-zA-Z]|^{keyword}[^a-zA-Z]|[^a-zA-Z]{keyword}$|^{keyword}$"
    sparql.setQuery(f"""
    SELECT ?item ?itemLabel ?itemId ?image
    WHERE {{
        ?item rdfs:label ?itemLabel.
        FILTER(REGEX(?itemLabel, "{keyword}", "i")).
        ?item wdt:P31 wd:Q3305213.
        ?item wdt:P18 ?image.
        FILTER(LANG(?itemLabel)="en").
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
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
    SELECT ?item ?itemLabel ?itemId ?image
    WHERE {{
        ?item rdfs:label ?itemLabel.
        ?item wdt:P{search_type} wd:{item_id}.
        ?item wdt:P31 wd:Q3305213.
        FILTER(LANG(?itemLabel)="en").
        ?item wdt:P18 ?image.
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
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
            ret = get_painting_sparql(keyword)
            print("Results by name : \n")
            for r in ret:
                print(r["itemLabel"]["value"])
            ret = get_movement_sparql(keyword)
            print("Results by movement : \n")
            for r in ret:
                print(r["itemLabel"]["value"])
            print("Results by genre : \n")
            ret = get_genre_sparql(keyword)
            for r in ret:
                print(r["itemLabel"]["value"])

#Uncomment the row below to test the semantic search feature
#test()  
