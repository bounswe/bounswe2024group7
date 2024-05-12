from rest_framework import generics
from ..serializers import PostSerializer
from ..models import Post
from ..permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class UserPostsList(generics.ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_queryset(self):
        username = self.kwargs['username']
        user_posts = Post.objects.filter(profile__username=username)
        return user_posts
