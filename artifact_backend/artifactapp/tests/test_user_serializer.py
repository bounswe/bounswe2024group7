import unittest
from unittest.mock import patch
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from ..models import Profile  # Adjust the import according to your project structure
from ..serializers import UserSerializer, ProfileListSerializer  # Adjust the import according to your project structure

class SignupViewTestCase(APITestCase):

    def setUp(self):
        self.url = reverse('signup')  # Make sure the URL name 'signup' matches your URL configuration

    @patch('..views.Profile.objects.get')  # Adjust the import path to match your project structure
    @patch('..serializers.UserSerializer.save')  # Adjust the import path to match your project structure
    def test_signup_success(self, mock_save, mock_profile_get):
        # Mock the user instance
        mock_user = User(username='newuser')
        mock_save.return_value = mock_user
        mock_user.instance = mock_user
        
        # Mock the profile get
        mock_profile = Profile(user=mock_user)
        mock_profile_get.return_value = mock_profile

        data = {
            'username': 'newuser',
            'password': 'newpassword'
        }

        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'User created successfully')

        # Verify the profile data
        profile_serializer = ProfileListSerializer(mock_profile)
        self.assertEqual(response.data['profile'], profile_serializer.data)

        mock_save.assert_called_once()
        mock_profile_get.assert_called_once_with(username=mock_user)

    def test_signup_invalid_data(self):
        data = {
            'username': '',
            'password': ''
        }

        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('username', response.data)
        self.assertIn('password', response.data)

if __name__ == '__main__':
    unittest.main()
