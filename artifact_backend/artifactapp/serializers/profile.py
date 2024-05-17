from rest_framework import serializers
from ..models import Profile
from . import ImageSerializer


class ProfileListSerializer(serializers.ModelSerializer):
    profile_picture = ImageSerializer()

    class Meta:
        model = Profile
        fields = '__all__'


class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def to_representation(self, instance):
        serializer = ProfileListSerializer(instance)
        return serializer.data