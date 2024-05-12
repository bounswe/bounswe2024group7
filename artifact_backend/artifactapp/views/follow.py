from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..models import Profile
from ..serializers import FollowSerializer


class FollowView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowSerializer

    def perform_create(self, serializer):
        profile_id = serializer.validated_data['profile_id']
        profile_to_follow = Profile.objects.get(id=profile_id)
        self.request.user.profile.following.add(profile_to_follow)
