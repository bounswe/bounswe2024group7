from django.test import TestCase
from django.contrib.auth.models import User
from ..models import Post, Profile, Comment, Image
from ..serializers import CommentCreateSerializer, CommentRetrieveSerializer

class CommentSerializerTests(TestCase):
    def setUp(self):
        # Create test data
        self.user = User.objects.create(username='testuser')
        self.profile = Profile.objects.get(username=self.user)
        self.image = Image.objects.create(url='example.com/image.jpg')
        self.post = Post.objects.create(title='Test Post', content='Test Content', profile=self.profile, image=self.image)
        self.comment = Comment.objects.create(post=self.post, profile=self.profile, content='Test Comment')
        self.serializer = CommentRetrieveSerializer(instance=self.comment)

    def test_contains_expected_attributes(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), {'id', 'content', 'profile', 'created_at', 'updated_at', 'post'})

    def test_contains_expected_data(self):
        data = self.serializer.data
        excluded_fields = ['created_at', 'updated_at']
        print(data)
        for key, value in data.items():
            if key not in excluded_fields:
                if key == 'profile':
                    self.assertEqual(value['username'], self.profile.username.username)
                elif key == 'post':
                    self.assertEqual(value, self.post.id)
                else:
                    self.assertEqual(value, getattr(self.comment, key))
