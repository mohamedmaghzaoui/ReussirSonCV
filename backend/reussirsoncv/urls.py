from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.http import JsonResponse
from django.conf.urls.static import static
def test_api(request):
    return JsonResponse({"message": "API is working!"})
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user.urls')),
    path('api/', include('resume.urls')),
    path('api/', include('ats.urls')),
    path('api/test/', test_api),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
