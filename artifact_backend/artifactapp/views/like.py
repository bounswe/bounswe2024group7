from django.shortcuts import get_object_or_404
from rest_framework import generics, status, views
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
        post_id = self.kwargs.get('pk')
        post = get_object_or_404(Post, pk=post_id)
        user_profile = request.user.profile

        # Check if the user has already liked the post
        if Like.objects.filter(profile=user_profile, post=post).exists():
            return Response({"error": "You have already liked this post."}, status=status.HTTP_400_BAD_REQUEST)

        # Create a like for the authenticated user on the specified post
        like = Like.objects.create(profile=user_profile, post=post)
        serializer = LikeSerializer(like)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class LikeRetrieve(generics.RetrieveAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]  # TODO: Reconsider IsAuthenticated


class UnlikeView(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def create(self, request, *args, **kwargs):
        post_id = self.kwargs.get('pk')
        post = get_object_or_404(Post, pk=post_id)
        like = Like.objects.filter(profile=self.request.user.profile, post=post)
        if like.exists():
            like.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "You have not liked this post."}, status=status.HTTP_400_BAD_REQUEST)


class UserLikesList(generics.ListAPIView):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

    def get_queryset(self):
        username = self.kwargs['username']
        user_likes = Like.objects.filter(profile__username=username)
        return user_likes


class LikeCountView(views.APIView):
    def get(self, request, pk, *args, **kwargs):
        post = get_object_or_404(Post, pk=pk)
        like_count = Like.objects.filter(post=post).count()
        return Response({'like_count': like_count}, status=status.HTTP_200_OK)
