from rest_framework import generics, permissions, status
from ..models import Bookmark, Profile, Post
from ..serializers import BookmarkSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


class BookmarkListView(generics.ListAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(profile=self.request.user.profile)

    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.profile)


class BookmarkDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(profile=self.request.user.profile)


class UserBookmarkListView(generics.RetrieveAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        username = self.kwargs.get('username')
        profile = get_object_or_404(Profile, username=username)
        bookmark = get_object_or_404(Bookmark, profile=profile)
        return bookmark


class BookmarkPostView(generics.CreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        post_id = self.kwargs.get('post_id')
        post = get_object_or_404(Post, pk=post_id)

        # Get the bookmark for the user
        bookmark = get_object_or_404(Bookmark, profile=request.user.profile)

        # Check if the post is already bookmarked
        if bookmark.posts.filter(pk=post_id).exists():
            return Response({"error": "Post is already bookmarked."}, status=status.HTTP_400_BAD_REQUEST)

        # Add the post to the bookmark's posts
        bookmark.posts.add(post)

        serializer = self.get_serializer(bookmark)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UnbookmarkPostView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BookmarkSerializer

    def create(self, request, *args, **kwargs):
        post_id = self.kwargs.get('post_id')
        post = get_object_or_404(Post, pk=post_id)

        # Get the bookmark for the user
        bookmark = get_object_or_404(Bookmark, profile=request.user.profile)

        # Check if the post is bookmarked by the user
        if not bookmark.posts.filter(pk=post_id).exists():
            return Response({"error": "Post is not bookmarked."}, status=status.HTTP_400_BAD_REQUEST)

        # Remove the post from the bookmark's posts
        bookmark.posts.remove(post)

        return Response(status=status.HTTP_204_NO_CONTENT)