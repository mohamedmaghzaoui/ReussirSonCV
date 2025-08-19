from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest.mock import patch
from .models import User

class UserAuthTests(APITestCase):

    def setUp(self):
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.user_url = reverse('user')
        self.password_url = reverse('change_password')
        self.logout_url = reverse('logout')

        self.user_data = {
            "email": "test@example.com",
            "password": "Test1234!",
            "first_name": "Test",
            "last_name": "User",
        }

        # Patch UserSerializer.create for all tests
        patcher = patch('user.serializers.UserSerializer.create', new=self.fake_create_user)
        self.addCleanup(patcher.stop)  # automatically remove patch after tests
        patcher.start()

    def fake_create_user(self, validated_data):
        """Force users to be active during tests"""
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            profile_picture=validated_data.get('profile_picture'),
            birthdate=validated_data.get('birthdate'),
            is_active=True,  # Auto-activate
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def test_register_login_logout(self):
        # Register
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Login immediately without activation
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Logout
        self.client.post(self.logout_url)

    def test_user_crud(self):
        # Register
        self.client.post(self.register_url, self.user_data, format='json')
        # Login immediately without activation
        response = self.client.post(self.login_url, self.user_data, format='json')

        # GET user info
        response = self.client.get(self.user_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.user_data["email"])

        # Update user info
        update_data = {"birthdate": "2000-01-01"}
        response = self.client.put(self.user_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_change_password(self):
        # Register
        self.client.post(self.register_url, self.user_data, format='json')
        # Login immediately without activation
        response = self.client.post(self.login_url, self.user_data, format='json')
        # Change password
        response = self.client.put(self.password_url, {
            "old_password": "Test1234!",
            "new_password": "NewPass123!"
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Logout
        self.client.post(self.logout_url)

        # Login with new password
        response = self.client.post(self.login_url, {
            "email": "test@example.com",
            "password": "NewPass123!"
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
