from SPARQLWrapper import SPARQLWrapper, JSON

sparql = SPARQLWrapper("https://query.wikidata.org/bigdata/namespace/wdq/sparql")
sparql.setReturnFormat(JSON)

def get_painting_sparql(keyword):
    sparql.setQuery(f"""
    SELECT ?item ?itemLabel ?itemId ?image
    WHERE {{
        ?item rdfs:label "{keyword}"@en.
        ?item rdfs:label ?itemLabel.
        ?item wdt:P31 wd:Q3305213.
        ?item wdt:P18 ?image.
        FILTER(LANG(?itemLabel)="en").
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
    }}
    """ )
    try:
        return sparql.queryAndConvert()["results"]["bindings"]
    except Exception as e:
        print(e)

def get_movement_sparql(keyword):
    sparql.setQuery(f"""
    SELECT ?item ?itemLabel ?itemId
    WHERE {{
        ?item rdfs:label "{keyword}"@en.
        ?item rdfs:label ?itemLabel.
        ?item wdt:P31 wd:Q968159.
        FILTER(LANG(?itemLabel)="en").
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
    }}
    """ )
    if len(sparql.queryAndConvert()["results"]["bindings"]) != 0:
        possible_id = sparql.queryAndConvert()["results"]["bindings"][0]["itemId"]
        if(possible_id):
            item_id = possible_id["value"]
            return find_paintings(135, item_id)
    return []

def get_genre_sparql(keyword):
    sparql.setQuery(f"""
    SELECT ?item ?itemLabel ?itemId
    WHERE {{
        ?item rdfs:label "{keyword}"@en.
        ?item rdfs:label ?itemLabel.
        ?item wdt:P31 wd:Q16743958.
        FILTER(LANG(?itemLabel)="en").
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
    }}
    """ )
    if len(sparql.queryAndConvert()["results"]["bindings"]) != 0:
        possible_id = sparql.queryAndConvert()["results"]["bindings"][0]["itemId"]
        if(possible_id):
            item_id = possible_id["value"]
            return find_paintings(136, item_id)
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
        print(e)
