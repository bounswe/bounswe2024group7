from django.contrib.auth import authenticate, login, logout
from rest_framework import status, views
from rest_framework.response import Response
from ..serializers import UserSerializer, LoginSerializer
from .search import related_search
from rest_framework.decorators import api_view

class SignupView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'],
                                password=serializer.validated_data['password'])
            if user:
                login(request, user)
                return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)


class HealthView(views.APIView):
    def get(self, request):
        return Response(
            {
                "status": 200,
                "message": "The app is up and running."
            },
            status=status.HTTP_200_OK
        )


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

        print(formatted_results)
        return Response({
            'results': formatted_results
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

