from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status


def send_otp_email(email, otp):
    try:
        subject = 'Your OTP Code'
        message = f'Your OTP code is {otp}. It is valid for 5 Minutes.'
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
    except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
