from django.test import TestCase
from django.contrib.auth.models import User
from ..models import Profile, Image
from ..serializers import ProfileListSerializer


class ProfileSerializerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser')
        self.image = Image.objects.create(url='example.com/image.jpg')
        # No need to create profile because it is created by the signal automatically when user is created.
        self.profile = Profile.objects.get(username=self.user)
        self.serializer = ProfileListSerializer(instance=self.profile)

    def test_contains_expected_attributes(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()),
                         {'id', 'username', 'bio', 'profile_picture', 'followers', 'created_at', 'updated_at'})

    def test_contains_expected_data(self):
        data = self.serializer.data
        excluded_fields = ['created_at', 'updated_at']
        for key, value in data.items():
            if key not in excluded_fields:
                if key == 'username':
                    # Access username attribute of the User object
                    self.assertEqual(value, self.profile.username.username)
                elif key == 'followers':
                    followers_ids = [follower.id for follower in self.profile.followers.all()]
                    self.assertEqual(value, followers_ids)
                else:
                    self.assertEqual(value, getattr(self.profile, key))
