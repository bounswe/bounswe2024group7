from rest_framework import generics, status
from rest_framework.response import Response
from ..serializers import CommentCreateSerializer, CommentRetrieveSerializer
from ..models import Comment
from ..permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class CommentListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = CommentRetrieveSerializer

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Comment.objects.filter(post_id=post_id)

    def get_serializer_class(self):
        # Use different serializer classes for read and write operations
        if self.request.method == 'POST':
            return CommentCreateSerializer
        return CommentRetrieveSerializer

    def perform_create(self, serializer):
        # Add the post ID to the serializer context
        serializer.context['post_id'] = self.kwargs['pk']
        # Call the serializer's create method
        serializer.save()


class CommentRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    lookup_field = "pk"
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        # Use different serializer classes for read and write operations
        if self.request.method == 'PUT':
            return CommentCreateSerializer
        return CommentRetrieveSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()  # Retrieve the existing Comment object
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(CommentRetrieveSerializer(instance).data, status=status.HTTP_200_OK)


class UserCommentsList(generics.ListAPIView):
    serializer_class = CommentRetrieveSerializer
    queryset = Comment.objects.all()

    def get_queryset(self):
        username = self.kwargs['username']
        user_comments = Comment.objects.filter(profile__username=username)
        return user_comments
