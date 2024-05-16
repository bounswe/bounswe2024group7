from SPARQLWrapper import SPARQLWrapper, JSON

sparql = SPARQLWrapper("https://query.wikidata.org/bigdata/namespace/wdq/sparql")
sparql.setReturnFormat(JSON)

def execute_sparql_query(query):
    try:
        sparql.setQuery(query)
        return sparql.queryAndConvert()["results"]["bindings"]
    except Exception as e:
        print(f"Error executing SPARQL query: {e}")
        return []

def get_painting_details(keyword):
    query = f"""
    SELECT ?painting ?paintingLabel ?image ?creator ?creatorLabel
WHERE {{
  ?painting wdt:P31 wd:Q3305213;  # specifically paintings
            rdfs:label ?label;
            wdt:P170 ?creator.
  FILTER(CONTAINS(LCASE(?label), "mona lisa") && LANG(?label) = "en").
  ?creator rdfs:label ?creatorLabel.
  OPTIONAL {{ ?painting wdt:P18 ?image. }}
  SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
}}
LIMIT 10
    """
    return execute_sparql_query(query)

def get_other_paintings_by_creator(creator_id):
    query = f"""
    SELECT ?otherPainting ?otherPaintingLabel ?image WHERE {{
      ?otherPainting wdt:P170 wd:{creator_id};
                      wdt:P31 wd:Q3305213;
                      rdfs:label ?otherPaintingLabel.
      OPTIONAL {{ ?otherPainting wdt:P18 ?image. }}
      FILTER(LANG(?otherPaintingLabel) = "en").
    }}
    LIMIT 10
    """
    return execute_sparql_query(query)

def related_search(keyword):
    # First, get the initial painting details, including creator
    paintings = get_painting_details(keyword)
    if not paintings:
        return []

    # Extract creator ID from the first relevant painting

    creator_id = paintings[0].get('creator', {}).get('value', '').split('/')[-1]
    print(f'creator_id: {creator_id}')
    if not creator_id:
        return paintings  # Return only the initial painting if no creator ID found

    # Fetch other paintings by the same creator
    other_paintings = get_other_paintings_by_creator(creator_id)
    # Combine initial painting results with other paintings by the same creator
    return paintings + other_paintings

# Testing function - uncomment to use
# def test():
#     while True:
#         keyword = input("Search something: ")
#         if keyword.lower() == "quit":
#             break
#         results = related_search(keyword)
#         if results:
#             for result in results:
#                 print(f"Painting: {result.get('paintingLabel', {}).get('value', 'N/A')}")
#                 print(f"Creator: {result.get('creatorLabel', {}).get('value', 'N/A')}")
#                 print(f"Genre: {result.get('genreLabel', {}).get('value', 'N/A')}")
#                 print(f"Image URL: {result.get('image', {}).get('value', 'N/A')}\n")
#         else:
#             print("No results found.")

# Uncomment below to test the functionality
# test()
