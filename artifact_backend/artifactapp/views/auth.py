from django.contrib.auth import authenticate, login, logout
from rest_framework import status, views
from rest_framework.response import Response
from .serializers import UserSerializer, LoginSerializer
from .search import get_painting_sparql, get_movement_sparql, get_genre_sparql, related_search
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
            user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
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
    query = request.data.get('query', None)
    if query:
        try:
            painting_results = get_painting_sparql(query)
            movement_results = get_movement_sparql(query)
            genre_results = get_genre_sparql(query)
            related_results = related_search(query)

            return Response({
                'painting_results': painting_results,
                'movement_results': movement_results,
                'genre_results': genre_results,
                'related_results':related_results
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Query parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

