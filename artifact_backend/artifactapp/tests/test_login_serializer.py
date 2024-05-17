import unittest
from unittest.mock import patch
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..serializers import ProfileListSerializer  # Adjust the import according to your project structure
from ..models import Profile  # Adjust the import according to your project structure

class LoginViewTestCase(APITestCase):

    def setUp(self):
        self.url = reverse('login')  # Make sure the URL name 'login' matches your URL configuration
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.profile = Profile.objects.create(user=self.user)  # Adjust fields accordingly

    @patch('..views.authenticate')  # Adjust the import path to match your project structure
    @patch('..views.login')  # Adjust the import path to match your project structure
    def test_login_success(self, mock_login, mock_authenticate):
        mock_authenticate.return_value = self.user
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertIn('profile', response.data)
        self.assertEqual(response.data['message'], 'Login successful')

        # Verify the profile data
        profile_serializer = ProfileListSerializer(self.profile)
        self.assertEqual(response.data['profile'], profile_serializer.data)

        mock_login.assert_called_once_with(response.wsgi_request, self.user)
        mock_authenticate.assert_called_once_with(username='testuser', password='testpassword')

    @patch('..views.authenticate')  # Adjust the import path to match your project structure
    def test_login_invalid_credentials(self, mock_authenticate):
        mock_authenticate.return_value = None
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Invalid credentials')

    def test_login_invalid_data(self):
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
