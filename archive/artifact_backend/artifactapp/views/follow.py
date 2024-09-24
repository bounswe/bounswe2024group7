from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Profile
from rest_framework.exceptions import ValidationError


class FollowView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.Serializer
    queryset = Profile.objects.none()  # Define an empty queryset to satisfy the assertion

    def perform_create(self, serializer):
        profile_id = self.kwargs.get('profile_id')
        profile_to_follow = Profile.objects.get(pk=profile_id)
        # Check if the user is trying to follow themselves
        if profile_to_follow == self.request.user.profile:
            raise ValidationError("You cannot follow yourself.")
        # Check if the user is already following the profile
        if self.request.user.profile.following.filter(pk=profile_id).exists():
            raise ValidationError("You are already following this profile.")
        self.request.user.profile.following.add(profile_to_follow)


class UnfollowView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = serializers.Serializer
    queryset = Profile.objects.none()  # Define an empty queryset to satisfy the assertion

    def create(self, request, *args, **kwargs):
        profile_id = self.kwargs.get('profile_id')
        profile_to_unfollow = Profile.objects.get(pk=profile_id)

        # Check if the user follows the profile to unfollow
        if not request.user.profile.following.filter(pk=profile_id).exists():
            raise ValidationError("You are not following this profile.")

        # Unfollow the profile
        request.user.profile.following.remove(profile_to_unfollow)
        return Response(status=status.HTTP_204_NO_CONTENT)
