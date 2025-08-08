from django.db import models
from django.contrib.auth.models import User
from user.models import User

class CV(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Update this line
    theme = models.JSONField(default=dict)
    name = models.CharField(max_length=255)
    section_order = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    cv = models.OneToOneField(CV, on_delete=models.CASCADE, related_name='profile')
    description = models.TextField()

class Experience(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='experiences')
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    address = models.CharField(max_length=255, blank=True)

class Education(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='educations')
    degree = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    address = models.CharField(max_length=255, blank=True)

class Project(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

class Skill(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
   

class Language(models.Model):
    cv = models.ForeignKey(CV, on_delete=models.CASCADE, related_name='languages')
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    
class PersonalInfo(models.Model):
    cv = models.OneToOneField(CV, on_delete=models.CASCADE, related_name='personal_info')
    
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=255, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    user_picture = models.ImageField(upload_to='resumeImages/', blank=True, null=True)

    linkedin = models.URLField(blank=True)
    website = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)