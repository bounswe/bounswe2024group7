from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
import asyncio
from aiohttp import ClientSession
from asgiref.sync import async_to_sync
from ..search import get_painting_sparql, get_movement_sparql, get_genre_sparql, related_search

@api_view(['POST'])
def artwork_search(request):
    query = request.data.get('query', None)
    if query:
        try:
            async def async_search():
                async with ClientSession() as session:
                    painting_results, movement_results, genre_results, related_results = await asyncio.gather(
                        get_painting_sparql(session, query),
                        get_movement_sparql(session, query),
                        get_genre_sparql(session, query),
                        related_search(session, query)
                    )
                    return {
                        'painting_results': painting_results+related_results+genre_results,
                        'movement_results': movement_results,
                        'genre_results': genre_results,
                        'related_results': related_results
                    }
            
            results = async_to_sync(async_search)()

            return Response(results, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Query parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
