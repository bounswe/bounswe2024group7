from rest_framework import serializers
from ..models import Post, Profile


class PostSerializer(serializers.ModelSerializer):
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
