from django.core.mail import send_mail,EmailMessage
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from django.template.loader import render_to_string
from django.utils.html import strip_tags


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
    



def send_opd_email(email, applicant_name, form_data):
    try:
        subject = 'OPD Form Request'
        
        html_message = render_to_string('opd_email_template.html', {
            'applicant_name': applicant_name,
            'form_data': form_data
        })
        plain_message = strip_tags(html_message)  
        
        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
            html_message=html_message, 
        )
    except Exception as e:
        print("email not sent")
        print(e)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

def opd_approved_email(to_email, pdf_path, referral_id):
    try:
        print('user mail',to_email)
        subject = f"Your Approved OPD Form - {referral_id}"
        message = "Dear Employee,\n\nYour OPD form has been approved. Please find the attached PDF for your records.\n\nRegards,\nAdmin Team"
        email = EmailMessage(subject, message, 'your-email@example.com', ['gopinaiduvarikuti143@gmail.com'])

        # Attach the PDF file
        email.attach_file(pdf_path)

        email.send()
        print(f"Email sent to {to_email} with the OPD form.")
    except Exception as e:
        print(f"Failed to send email: {e}")

def opd_rejected_email(to_email, referral_id):
    try:
        print('user mail',to_email)
        subject = f"Your OPD Form - {referral_id}"
        message = "Dear Employee,\n\nYour OPD form has been Rejected. Please contact Adminstration Department.\n\nRegards,\nAdmin Team"
        email = EmailMessage(subject, message, 'your-email@example.com', ['gopinaiduvarikuti143@gmail.com'])

        email.send()
        print(f"Email sent to {to_email} with the OPD form.")
    except Exception as e:
        print(f"Failed to send email: {e}")



def send_email_requisition_email(email, message):
    try:
        subject = "Your Email Requisition Response"
        full_message = f"""
        Dear User,

        {message}

        Thank you for your patience. If you have any further questions, feel free to reach out.

        Best regards,
        Support Team
        """
        send_mail(
            subject,
            full_message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def send_software_requisition_email(email, message):
    try:
        subject = "Your Software Requisition Response"
        full_message = f"""
        Dear User,

        {message}

        Thank you for your patience. If you have any further questions, feel free to reach out.

        Best regards,
        Support Team
        """
        send_mail(
            subject,
            full_message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        

        
