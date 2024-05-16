from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..search import related_search

@api_view(['POST'])
def artwork_search(request):
    query = request.data.get('query', '').strip()
    if not query:
        return Response({'error': 'Query parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        results = related_search(query)
        if not results:
            return Response({'message': 'No results found for the given query.'}, status=status.HTTP_404_NOT_FOUND)

        # Format the results into a more friendly JSON structure
        formatted_results = []
        for result in results:
            formatted_results.append({
                'painting': result.get('paintingLabel', {}).get('value', 'N/A'),
                'image_url': result.get('image', {}).get('value', 'N/A'),
                'creator': result.get('creatorLabel', {}).get('value', 'N/A'),
                'genre': result.get('genreLabel', {}).get('value', 'N/A'),
                'material': result.get('materialLabel', {}).get('value', 'N/A'),
            })

        for result in formatted_results:
            print(result)
        return Response({
            'results': formatted_results
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
