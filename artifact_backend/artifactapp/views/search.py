from rest_framework import status
from rest_framework.response import Response
from ..search import get_painting_sparql, get_movement_sparql, get_genre_sparql
from rest_framework.decorators import api_view


@api_view(['POST'])
def artwork_search(request):
    query = request.data.get('query', None)
    if query:
        try:
            painting_results = get_painting_sparql(query)
            movement_results = get_movement_sparql(query)
            genre_results = get_genre_sparql(query)
            return Response({
                'painting_results': painting_results,
                'movement_results': movement_results,
                'genre_results': genre_results
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Query parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
