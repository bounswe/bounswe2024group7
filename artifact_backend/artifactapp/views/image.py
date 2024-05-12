from rest_framework import generics
from rest_framework import permissions

from ..permissions import IsOwnerOrReadOnly
from ..models import Image
from ..serializers import ImageSerializer


class ImageListCreate(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ImageRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    lookup_field = "pk"
    permission_classes = [IsOwnerOrReadOnly]  # TODO: Not sure about permission.
