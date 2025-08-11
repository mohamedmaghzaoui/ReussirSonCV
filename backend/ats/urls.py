from django.urls import path
from .views import analyse_cv

urlpatterns = [
    path("analyse-cv/", analyse_cv, name="analyse_cv"),
]
