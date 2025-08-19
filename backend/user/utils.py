from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from .tokens import account_activation_token

def send_verification_email(user, request):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = account_activation_token.make_token(user)
    
    activation_link = request.build_absolute_uri(
        reverse('activate', kwargs={'uidb64': uid, 'token': token})
    )
    
    subject = "Confirme ton email"
    message = f"Bonjour {user.first_name},\n\nClique sur ce lien pour activer ton compte : {activation_link}"
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]
    
    send_mail(subject, message, from_email, recipient_list)
