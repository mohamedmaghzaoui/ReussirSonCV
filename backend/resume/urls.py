from rest_framework.routers import DefaultRouter
from .views import (
    CVViewSet,
    ExperienceViewSet,
    EducationViewSet,
    ProjectViewSet,
    LanguageViewSet,
    SkillViewSet,
    PersonalInfoViewSet,
    ProfileViewSet
)

router = DefaultRouter()
router.register('cvs', CVViewSet, basename='cv')
router.register('experiences', ExperienceViewSet, basename='experience')
router.register('educations', EducationViewSet, basename='education')
router.register('projects', ProjectViewSet, basename='project')
router.register('languages', LanguageViewSet, basename='language')
router.register('skills', SkillViewSet, basename='skill')
router.register('personal-infos', PersonalInfoViewSet, basename='personal-infos')
router.register('profiles', ProfileViewSet, basename='profiles')

urlpatterns = router.urls
