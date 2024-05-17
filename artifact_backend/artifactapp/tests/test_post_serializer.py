from django.test import TestCase
from django.contrib.auth.models import User
from datetime import datetime
from ..models import Post, Profile, Image, Label
from ..serializers import PostListSerializer


class PostSerializerTests(TestCase):
    def setUp(self):
        # Create test data
        self.user = User.objects.create(username='testuser')
        self.image = Image.objects.create(url='example.com/image.jpg')
        self.profile = Profile.objects.get(username=self.user)
        self.label1 = Label.objects.create(type='Type1', value='Value1')
        self.label2 = Label.objects.create(type='Type2', value='Value2')
        self.post = Post.objects.create(
            profile=self.profile,
            title='Test Post',
            content='Test Content',
            image=self.image,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        self.post.labels.add(self.label1, self.label2)
        self.serializer = PostListSerializer(instance=self.post)

    def test_contains_expected_attributes(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()),
                         {'id', 'title', 'content', 'image', 'labels', 'profile', 'created_at', 'updated_at'})

    def test_contains_expected_data(self):
        data = self.serializer.data
        excluded_fields = ['created_at', 'updated_at']
        for key, value in data.items():
            if key not in excluded_fields:
                if key == 'profile':
                    # Access profile username attribute
                    self.assertEqual(value['username'], self.profile.username.username)
                elif key == 'labels':
                    self.assertEqual(value, list(self.post.labels.all().values('id', 'type', 'value')))
                elif key == 'image':
                    self.assertEqual(value['id'], self.image.id)
                else:
                    self.assertEqual(value, getattr(self.post, key))
