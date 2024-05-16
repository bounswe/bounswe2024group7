from rest_framework import serializers

from ..models import Post, Profile
from . import ProfileSerializer, ImageSerializer, LabelSerializer


class PostListSerializer(serializers.ModelSerializer):
    labels = LabelSerializer(many=True, read_only=True)
    profile = ProfileSerializer(read_only=True)
    image = ImageSerializer(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        # Retrieve the Profile instance based on the username of the logged-in user
        user = self.context['request'].user
        profile = Profile.objects.get(username=user.username)

        # Add the profile to the validated data before saving
        validated_data['profile'] = profile

        # Call the superclass's create method to save the instance
        return super().create(validated_data)


class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        # Retrieve the Profile instance based on the username of the logged-in user
        user = self.context['request'].user
        profile = Profile.objects.get(username=user.username)

        # Add the profile to the validated data before saving
        validated_data['profile'] = profile

        # Call the superclass's create method to save the instance
        return super().create(validated_data)
