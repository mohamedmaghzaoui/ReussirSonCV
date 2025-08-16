from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import CV, Profile, Experience, Education, Project, Skill, Language, PersonalInfo

User = get_user_model()

class ResumeCRUDTestCase(APITestCase):
    def setUp(self):
        # Create two users: one owner and one other user for permission tests
        self.user = User.objects.create_user(email="user1@email.com", password="password123")
        self.other_user = User.objects.create_user(email="user2@email.com", password="password123")
        
        # Log in as owner user
        self.client.login(email="user1@email.com", password="password123")
        
        # Create CV for the owner user
        self.cv = CV.objects.create(
            user=self.user,
            name="Test CV",
            theme={"color": "blue"},
            section_order=["profile", "experience"]
        )
        
        
        
        # Create instances for other models similarly:
        self.experience = Experience.objects.create(
            cv=self.cv,
            title="Software Engineer",
            company="Company",
            start_date="2022-01-01",
            end_date="2022-12-31",
            description="Did stuff",
            address="Address"
        )
        
        self.education = Education.objects.create(
            cv=self.cv,
            degree="Bachelor",
            institution="University",
            start_date="2018-01-01",
            end_date="2021-01-01",
            description="Studied hard",
            address="Campus"
        )
        
        self.project = Project.objects.create(
            cv=self.cv,
            title="Project X",
            description="Secret project",
            start_date="2020-01-01",
            end_date="2020-12-31"
        )
        
        self.skill = Skill.objects.create(
            cv=self.cv,
            name="Python"
        )
        
        self.language = Language.objects.create(
            cv=self.cv,
            name="English",
            level="Advanced"
        )
        
    # test access denied for other user trying to edit/delete resources they font have access to
    def assertAccessForbidden(self, url, method, data=None):
        self.client.logout()
        self.client.login(email="user2@email.com", password="password123")
        if method == "put":
            response = self.client.put(url, data or {}, format="json")
        elif method == "delete":
            response = self.client.delete(url)
        else:
            raise ValueError("Unsupported method")
        self.assertIn(response.status_code, [status.HTTP_403_FORBIDDEN, status.HTTP_404_NOT_FOUND])
        self.client.logout()
        self.client.login(email="user1@email.com", password="password123")

    #### CV tests ####
    

    def test_cv_crud(self):
        # List URL (GET / POST)
        url = reverse('cv-list')
        
        # Create
        data = {"name": "New CV", "theme": {"color": "red"}, "section_order": ["profile"]}
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        cv_id = response.data["id"]
        
        # List
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Detail URL (GET / PUT / DELETE)
        detail_url = reverse('cv-detail', args=[cv_id])
        
        # Retrieve
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Update
        data_update = {"name": "Updated CV", "theme": {"color": "green"}, "section_order": ["profile"]}
        response = self.client.put(detail_url, data_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Permission denied test for update
        self.assertAccessForbidden(detail_url, method="put", data=data_update)
        
        # Delete
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # Permission denied test for delete (using existing self.cv)
        
        another_detail_url = reverse('cv-detail', args=[self.cv.id])
        self.assertAccessForbidden(another_detail_url, method="delete")



    #### Profile tests ####
    def test_profile_crud(self):
        list_url = reverse('profile-list')

        # Create
        data = {"cv": self.cv.id, "description": "New description"}
        response = self.client.post(list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        profile_id = response.data["id"]

        # List
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Detail URL
        detail_url = reverse('profile-detail', args=[profile_id])

        # Retrieve
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Update
        data_update = {"cv": self.cv.id, "description": "Updated description"}
        response = self.client.put(detail_url, data_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Permission denied update
        self.assertAccessForbidden(detail_url, method="put", data=data_update)

        # Delete
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

       


    #### Experience tests ####
    def test_experience_crud(self):
        list_url = reverse('experience-list')

        data = {
            "cv": self.cv.id,
            "title": "Dev",
            "company": "Company",
            "start_date": "2023-01-01",
            "end_date": "2023-12-31",
            "description": "Desc",
            "address": "Addr"
        }
        # Create
        response = self.client.post(list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        experience_id = response.data["id"]

        # List
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Detail URL
        detail_url = reverse('experience-detail', args=[experience_id])

        # Retrieve
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Update
        data_update = data.copy()
        data_update["title"] = "Dev Updated"
        response = self.client.put(detail_url, data_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Permission denied update
        self.assertAccessForbidden(detail_url, method="put", data=data_update)

        # Delete
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Permission denied delete (existing experience)
        existing_detail_url = reverse('experience-detail', args=[self.experience.id])
        self.assertAccessForbidden(existing_detail_url, method="delete")


    #### Education tests ####
    def test_education_crud(self):
        list_url = reverse('education-list')

        data = {
            "cv": self.cv.id,
            "degree": "Master",
            "institution": "School",
            "start_date": "2019-01-01",
            "end_date": "2021-01-01",
            "description": "Desc",
            "address": "Addr"
        }
        # Create
        response = self.client.post(list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        education_id = response.data["id"]

        # List
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Detail URL
        detail_url = reverse('education-detail', args=[education_id])

        # Retrieve
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Update
        data_update = data.copy()
        data_update["degree"] = "PhD"
        response = self.client.put(detail_url, data_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Permission denied update
        self.assertAccessForbidden(detail_url, method="put", data=data_update)

        # Delete
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Permission denied delete (existing education)
        existing_detail_url = reverse('education-detail', args=[self.education.id])
        self.assertAccessForbidden(existing_detail_url, method="delete")

    #### Project tests ####
    def test_project_crud(self):
        list_url = reverse('project-list')

        data = {
            "cv": self.cv.id,
            "title": "New Project",
            "description": "Description",
            "start_date": "2021-01-01",
            "end_date": "2022-01-01"
        }
        # Create
        response = self.client.post(list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        project_id = response.data["id"]

        # List
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Detail URL
        detail_url = reverse('project-detail', args=[project_id])

        # Retrieve
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Update
        data_update = data.copy()
        data_update["title"] = "Updated Project"
        response = self.client.put(detail_url, data_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Permission denied update
        self.assertAccessForbidden(detail_url, method="put", data=data_update)

        # Delete
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Permission denied delete (existing project)
        existing_detail_url = reverse('project-detail', args=[self.project.id])
        self.assertAccessForbidden(existing_detail_url, method="delete")

    #### Skill tests ####
    def test_skill_crud(self):
        list_url = reverse('skill-list')

        data = {
            "cv": self.cv.id,
            "name": "Django"
        }
        # Create
        response = self.client.post(list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        skill_id = response.data["id"]

        # List
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Detail URL
        detail_url = reverse('skill-detail', args=[skill_id])

        # Retrieve
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Update
        data_update = data.copy()
        data_update["name"] = "Django REST Framework"
        response = self.client.put(detail_url, data_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Permission denied update
        self.assertAccessForbidden(detail_url, method="put", data=data_update)

        # Delete
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Permission denied delete (existing skill)
        existing_detail_url = reverse('skill-detail', args=[self.skill.id])
        self.assertAccessForbidden(existing_detail_url, method="delete")


    #### Language tests ####
    def test_language_crud(self):
        list_url = reverse('language-list')

        data = {
            "cv": self.cv.id,
            "name": "French",
            "level": "Intermediate"
        }
        # Create
        response = self.client.post(list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        language_id = response.data["id"]

        # List
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Detail URL
        detail_url = reverse('language-detail', args=[language_id])

        # Retrieve
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Update
        data_update = data.copy()
        data_update["level"] = "Fluent"
        response = self.client.put(detail_url, data_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Permission denied update
        self.assertAccessForbidden(detail_url, method="put", data=data_update)

        # Delete
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Permission denied delete (existing language)
        existing_detail_url = reverse('language-detail', args=[self.language.id])
        self.assertAccessForbidden(existing_detail_url, method="delete")


    #### PersonalInfo tests ####
    def test_personalinfo_crud(self):
        list_url = reverse('personalInfo-list')
        data = {
            "cv": self.cv.id,
            "first_name": "Jane",
            "last_name": "Smith",
            "email": "jane@example.com",
            "title": "dev"
            
        }
        # Create
        response = self.client.post(list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        personalinfo_id = response.data["id"]

        # List
        response = self.client.get(list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Detail URL
        detail_url = reverse('personalInfo-detail', args=[personalinfo_id])

        # Retrieve
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Update
        data_update = data.copy()
        data_update["first_name"] = "Janet"
        response = self.client.put(detail_url, data_update, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Permission denied update
        self.assertAccessForbidden(detail_url, method="put", data=data_update)

        # Delete
        response = self.client.delete(detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)