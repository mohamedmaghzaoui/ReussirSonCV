from django.urls import path
from .views import register_view, login_view, logout_view,user_view,change_password_view

urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('user/', user_view, name='user'),
    path('user/password/', change_password_view, name='change_password'),
  
   
]
