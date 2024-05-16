from rest_framework import serializers

from . import ProfileSerializer
from ..models import Post, Profile, Comment


class CommentCreateSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'content', 'profile']

    def create(self, validated_data):
        post_id = self.context.get('post_id')
        post = Post.objects.get(pk=post_id)
        user = self.context['request'].user
        profile = Profile.objects.get(username=user.username)
        comment = Comment.objects.create(
            profile=profile,
            post=post,
            content=validated_data['content']
        )
        return comment


class CommentRetrieveSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
