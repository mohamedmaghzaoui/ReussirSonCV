from django.contrib import admin
from .models import CV, Profile, Experience, Education, Project, Skill, Language,PersonalInfo

admin.site.register(CV)
admin.site.register(Profile)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Project)
admin.site.register(Skill)
admin.site.register(Language)
admin.site.register(PersonalInfo)
