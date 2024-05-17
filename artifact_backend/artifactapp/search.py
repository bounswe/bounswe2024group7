import asyncio
from aiohttp import ClientSession
from SPARQLWrapper import SPARQLWrapper, JSON
from collections import defaultdict

def consolidate_art_data(data, creator_label):

    # Dictionary to store consolidated information
    consolidated_info = defaultdict(lambda: {
        'genreLabel': set(), 
        'materialLabel': set(),
        'creatorLabel': {
                "xml:lang": "en",
                "type": "literal",
                "value": creator_label
            }
        })

    # Iterate over each entry in the data
    for entry in data:
        item_id = entry['item']['value']
        genre_label = entry['genreLabel']['value']
        material_label = entry['materialLabel']['value']
        if entry['image']:
            image_value = entry['image']['value']
        else:
            image_value = None
        consolidated_info[item_id]['image'] = {
                "type": "uri",
                "value": image_value
            }
        consolidated_info[item_id]['itemLabel'] = entry['itemLabel']
        consolidated_info[item_id]['genreLabel'].add(genre_label)
        consolidated_info[item_id]['materialLabel'].add(material_label)

    # Format the data for output
    formatted_data = []
    for item_id, info in consolidated_info.items():
        formatted_data.append({
            'item': item_id,
            'genreLabel': list(info['genreLabel']),
            'materialLabel': list(info['materialLabel']),
            'creatorLabel': info['creatorLabel'],
            'image': info['image'],
            'itemLabel': info['itemLabel']
        })

    return formatted_data

sparql_endpoint = "https://query.wikidata.org/bigdata/namespace/wdq/sparql"

async def fetch_sparql(session, query):
    async with session.post(sparql_endpoint, data={'query': query}, headers={'Accept': 'application/sparql-results+json'}) as response:
        return await response.json()

async def get_painting_sparql(session, keyword):
    query = f"""
    SELECT ?item ?itemLabel ?image ?creatorLabel ?creator ?genreLabel ?materialLabel
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
        grouped_results = {}
        for result in results["results"]["bindings"]:
            image_url = result["image"]["value"]
            if image_url not in grouped_results:
                grouped_results[image_url] = {
                    "creator": result["creator"],
                    "image": result["image"],
                    "itemLabel": result["itemLabel"],
                    "creatorLabel": result["creatorLabel"],
                    "genreLabels": set(),  # use a set to store genres
                    "materialLabels": set()  # use a set to store materials
                }
            # Add material and genre to their respective sets
            grouped_results[image_url]["materialLabels"].add(result["materialLabel"]["value"])
            grouped_results[image_url]["genreLabels"].add(result["genreLabel"]["value"])

        # Convert material and genre sets to lists for the final output
        for item in grouped_results.values():
            item["materialLabel"] = {"xml:lang": "en", "type": "literal", "value": list(item["materialLabels"])}
            item["genreLabel"] = {"xml:lang": "en", "type": "literal", "value": list(item["genreLabels"])}
            del item["materialLabels"]  # remove the set from the final output
            del item["genreLabels"]  # remove the set from the final output

        return list(grouped_results.values())
    except Exception as e:
        return []

async def get_paintings_by_creator(session, creator_id, creator_label):
    query = f"""
    SELECT ?item ?itemLabel ?image ?creatorLabel ?creator ?genreLabel ?materialLabel
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
        return consolidate_art_data(results['results']["bindings"], creator_label)
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
    creators = dict()
    painting_results = await get_painting_sparql(session, keyword)
    for result in painting_results:
        creator = result.get("creator", {}).get("value", "")
        creator_label = result.get("creatorLabel", {}).get("value", "")
        if creator:
            creator_id = creator.split("/")[-1]
            if creator_id[0] != "Q":
                continue
            creators[creator_id] = creator_label

    s = sorted(creators, key=len)
    new_result = await get_paintings_by_creator(session, s[0], creators[s[0]])

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
