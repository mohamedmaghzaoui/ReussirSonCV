from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied

from .models import CV, Experience, Education, Project, Language, Skill,PersonalInfo,Profile
from .serializers import (
    CVSerializer,
    ExperienceSerializer,
    EducationSerializer,
    ProjectSerializer,
    LanguageSerializer,
    SkillSerializer,
    PersonalInfoSerializer,
    ProfileSerializer
)

class CVViewSet(viewsets.ModelViewSet):
    serializer_class = CVSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CV.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You can't edit someone else's CV.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.user != self.request.user:
            raise PermissionDenied("You can't delete someone else's CV.")
        instance.delete()


class CVSubModelViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.model.objects.filter(cv__user=self.request.user)

    def perform_create(self, serializer):
        cv = serializer.validated_data["cv"]
        if cv.user != self.request.user:
            raise PermissionDenied("You can't add to someone else's CV.")
        serializer.save()

    def perform_update(self, serializer):
        if serializer.instance.cv.user != self.request.user:
            raise PermissionDenied("You can't update someone else's CV item.")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.cv.user != self.request.user:
            raise PermissionDenied("You can't delete someone else's CV item.")
        instance.delete()


class ExperienceViewSet(CVSubModelViewSet):
    serializer_class = ExperienceSerializer
    model = Experience


class EducationViewSet(CVSubModelViewSet):
    serializer_class = EducationSerializer
    model = Education


class ProjectViewSet(CVSubModelViewSet):
    serializer_class = ProjectSerializer
    model = Project


class LanguageViewSet(CVSubModelViewSet):
    serializer_class = LanguageSerializer
    model = Language


class SkillViewSet(CVSubModelViewSet):
    serializer_class = SkillSerializer
    model = Skill

class PersonalInfoViewSet(CVSubModelViewSet):
    serializer_class = PersonalInfoSerializer
    model = PersonalInfo
class ProfileViewSet(CVSubModelViewSet):
    serializer_class = ProfileSerializer
    model = Profile

