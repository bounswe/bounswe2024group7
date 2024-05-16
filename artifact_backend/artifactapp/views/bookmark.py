from rest_framework import generics, permissions
from ..models import Bookmark, Profile
from ..serializers import BookmarkSerializer


class BookmarkListCreateView(generics.ListCreateAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(profile=self.request.user.profile)

    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.profile)


class BookmarkDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Bookmark.objects.filter(profile=self.request.user.profile)


class UserBookmarkListView(generics.RetrieveAPIView):
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        username = self.kwargs.get('username')
        profile = Profile.objects.get(username=username)
        return Bookmark.objects.get(profile=profile)
