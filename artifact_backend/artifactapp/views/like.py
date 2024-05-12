from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from ..serializers import LikeSerializer
from ..models import Like, Post
from ..permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated


class LikeListCreate(generics.ListCreateAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = LikeSerializer

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Like.objects.filter(post_id=post_id)

    def create(self, request, *args, **kwargs):
        # Retrieve the post instance based on the post ID in the URL
        post_id = self.kwargs.get('pk')
        post = get_object_or_404(Post, pk=post_id)

        # Create a like for the authenticated user on the specified post
        like = Like.objects.create(profile=request.user.profile, post=post)

        # Return a successful response with the serialized like data
        serializer = LikeSerializer(like)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LikeRetrieveDestroy(generics.RetrieveDestroyAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly] # TODO: Reconsider IsAuthenticated


class UserLikesList(generics.ListAPIView):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

    def get_queryset(self):
        username = self.kwargs['username']
        user_likes = Like.objects.filter(profile__username=username)
        return user_likes
