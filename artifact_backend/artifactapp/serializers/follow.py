from rest_framework import serializers


class FollowSerializer(serializers.Serializer):
    profile_id = serializers.IntegerField()
