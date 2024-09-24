from rest_framework import serializers

from ..models import Post, Profile
from . import ProfileListSerializer, ImageSerializer, LabelSerializer


class PostListSerializer(serializers.ModelSerializer):
    labels = LabelSerializer(many=True, read_only=True)
    profile = ProfileListSerializer(read_only=True)
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
    username = serializers.CharField(write_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def create(self, validated_data):
        # Retrieve the Profile instance based on the username from the body of the request
        username = validated_data.pop('username')
        profile = Profile.objects.get(username=username)

        # Add the profile to the validated data before saving
        validated_data['profile'] = profile

        # Call the superclass's create method to save the instance
        return super().create(validated_data)
