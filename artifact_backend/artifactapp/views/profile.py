from rest_framework import generics
from ..models import Profile
from ..serializers import ProfileSerializer
from ..permissions import IsOwnerOrReadOnlyForProfile
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated


class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ProfileRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnlyForProfile]  # TODO: disallow changing username. Add signal to delete user when profile is deleted.


class FollowersListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        profile_id = self.kwargs['profile_id']
        profile = Profile.objects.get(pk=profile_id)
        return profile.followers.all()


class FollowingListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_queryset(self):
        profile_id = self.kwargs['profile_id']
        profile = Profile.objects.get(pk=profile_id)
        return profile.following.all()
