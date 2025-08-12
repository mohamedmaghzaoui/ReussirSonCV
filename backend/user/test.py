from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
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
    "last_name": "User"
}


    def test_register_login_logout(self):
        # 1. Register
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # 2. Logout
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # 3. Login
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_crud(self):
        # Create user first
        self.client.post(self.register_url, self.user_data, format='json')

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
