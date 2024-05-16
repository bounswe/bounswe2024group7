from rest_framework import generics
from ..serializers import PostCreateSerializer, PostListSerializer
from ..models import Post
from ..permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PostCreateSerializer
        return PostListSerializer


class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    lookup_field = "pk"
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH' :
            return PostCreateSerializer
        return PostListSerializer


class UserPostsList(generics.ListAPIView):
    serializer_class = PostListSerializer
    queryset = Post.objects.all()

    def get_queryset(self):
        username = self.kwargs['username']
        user_posts = Post.objects.filter(profile__username=username)
        return user_posts
