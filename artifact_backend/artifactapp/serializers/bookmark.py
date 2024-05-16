from rest_framework import serializers
from ..models import Bookmark, Post
from . import PostListSerializer


class BookmarkSerializer(serializers.ModelSerializer):
    posts = PostListSerializer(many=True, read_only=True)

    class Meta:
        model = Bookmark
        fields = ['id', 'profile', 'posts', 'created_at']
        read_only_fields = ['profile', 'created_at']
