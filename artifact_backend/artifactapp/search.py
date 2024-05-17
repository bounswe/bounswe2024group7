import asyncio
from aiohttp import ClientSession
from SPARQLWrapper import SPARQLWrapper, JSON

sparql_endpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql"

async def fetch_sparql(session, query):
    async with session.post(sparql_endpoint, data={'query': query}, headers={'Accept': 'application/sparql-results+json'}) as response:
        return await response.json()

async def get_painting_sparql(session, keyword):
    query = f"""
    SELECT ?itemLabel ?image ?creatorLabel ?creator ?genreLabel ?materialLabel
    WHERE {{
        ?item rdfs:label ?itemLabel.
        ?item wdt:P31 wd:Q3305213.
        ?item wdt:P18 ?image.
        ?item wdt:P136 ?genre.
        ?item wdt:P170 ?creator.
        ?item wdt:P186 ?material.
        FILTER(LANG(?itemLabel)="en" && (CONTAINS(LCASE(?itemLabel), LCASE("{keyword}")))).
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId).
        SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
    }}
    LIMIT 10
    """
    try:
        results = await fetch_sparql(session, query)
        print("first result: ", results["results"]["bindings"])
        return results["results"]["bindings"]
    except Exception as e:
        return []

async def get_paintings_by_creator(session, creator_id):
    query = f"""
    SELECT ?itemLabel ?image ?creatorLabel ?creator ?genreLabel ?materialLabel
    WHERE {{
        ?item rdfs:label ?itemLabel.
        ?item wdt:P31 wd:Q3305213.
        ?item wdt:P18 ?image.
        ?item wdt:P136 ?genre.
        ?item wdt:P170 wd:{creator_id}.
        ?item wdt:P186 ?material.
        FILTER(LANG(?itemLabel)="en").
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId).
        SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
    }}
    LIMIT 50
    """
    try:
        results = await fetch_sparql(session, query)
        return results["results"]["bindings"]
    except Exception as e:
        return []

async def get_movement_sparql(session, keyword):
    query = f"""
    SELECT ?item ?itemLabel ?itemId
    WHERE {{
        ?item rdfs:label ?itemLabel.
        ?item wdt:P31 wd:Q968159.
        FILTER(LANG(?itemLabel)="en" && (CONTAINS(LCASE(?itemLabel), LCASE("{keyword}")))).
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
    }}
    """
    try:
        results = await fetch_sparql(session, query)
        if results["results"]["bindings"]:
            lst = []
            for result in results["results"]["bindings"]:
                item_id = result["itemId"]["value"]
                lst.extend(await find_paintings(session, 135, item_id))
            for result in lst:
                print('movementlst: ', result)
            return lst
    except Exception as e:
        return []
    return []

async def get_genre_sparql(session, keyword):
    query = f"""
    SELECT ?item ?itemLabel ?itemId
    WHERE {{
        ?item rdfs:label ?itemLabel.
        ?item wdt:P31 wd:Q16743958.
        FILTER(LANG(?itemLabel)="en" && (CONTAINS(LCASE(?itemLabel), LCASE("{keyword}")))).
        BIND(REPLACE(STR(?item), "http://www.wikidata.org/entity/", "") AS ?itemId)
    }}
    """
    try:
        results = await fetch_sparql(session, query)
        if results["results"]["bindings"]:
            lst = []
            for result in results["results"]["bindings"]:
                item_id = result["itemId"]["value"]
                lst.extend(await find_paintings(session, 136, item_id))
            for result in lst:
                print('genrelst: ', result)
            return lst
    except Exception as e:
        return []
    return []

async def find_paintings(session, search_type, item_id):
    query = f"""
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
    }}
    """
    try:
        results = await fetch_sparql(session, query)
        return results["results"]["bindings"]
    except Exception as e:
        return []

async def related_search(session, keyword):
    creators = set()
    painting_results = await get_painting_sparql(session, keyword)
    for result in painting_results:
        creator = result.get("creator", {}).get("value", "")
        if creator:
            creator_id = creator.split("/")[-1]
            if creator_id[0] != "Q":
                continue
            creators.add(creator_id)

    print(sorted(creators, key=len))
    new_result = await get_paintings_by_creator(session, sorted(creators, key=len)[0])
    
    print("second result: ", new_result)
    return new_result

def generate_combinations(words, index=0, current_combination=None, result=None):
    if result is None:
        result = []
    if current_combination is None:
        current_combination = []
    
    if index == len(words):
        result.append(' '.join(current_combination))
        return result
    
    word = words[index]
    lower_first = word[0].lower() + word[1:]
    upper_first = word[0].upper() + word[1:]
    
    generate_combinations(words, index + 1, current_combination + [lower_first], result)
    generate_combinations(words, index + 1, current_combination + [upper_first], result)
    
    return result
