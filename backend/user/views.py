from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.middleware.csrf import get_token
from django.contrib.auth import update_session_auth_hash
from .tokens import account_activation_token
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from .utils import send_verification_email
from django.shortcuts import render


# verify email
@api_view(['GET'])
@permission_classes([AllowAny])
def activate_view(request, uidb64, token):
    success = False
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        success = True

    return render(request, 'activation.html', {'success': success})

#add a new user
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save(is_active=False) # in case problem with serialiser set user to not active
        send_verification_email(user, request)
        
        return Response({'message': 'Utilisateur créé. Vérifie ton email pour l’activer.'}, status=201)
    return Response(serializer.errors, status=400)

#login
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    if user is not None:
        login(request, user)
        return Response({'message': 'Logged in successfully'})
    return Response({'error': 'Invalid credentials'}, status=401)

#logout user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out'})

# put and get request to user data
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_view(request):
    user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = request.data.copy()
        data.pop('email', None)  # supprime 'email' s'il existe
    
        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User updated successfully', 'user': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#modify password view
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    
    old_password = request.data.get('old_password')
    new_password = request.data.get('new_password')

    if not old_password or not new_password:
        return Response({'error': 'Both old_password and new_password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = request.user
    if not user.check_password(old_password):
        return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    # Keep user logged in after password change
    update_session_auth_hash(request, user)

    return Response({'message': 'Password updated successfully'})


