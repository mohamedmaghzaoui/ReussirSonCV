from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Tu peux ajouter des champs ici, ex :
    # bio = models.TextField(blank=True, null=True)
    pass
