# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from .models import MasterData, Degree, Student, Faculty,Role,Employee,Alumni,ExEmployee,Department,Designation,UserAccount,Service,RoleServiceAssignment
from .serializers import UserRegistrationSerializer,LoginSerializer,ServiceSerializer
import pyotp
from .send_mails import send_otp_email
from django.utils import timezone
from datetime import datetime, timedelta
from dateutil import parser
from .utils import change_date




class RegisterAPIView(APIView):
    def post(self, request):
        try:
            user_data = request.data
            role_name = user_data.get('role')
            user_dob = change_date(user_data.get('dob'))
            
        
            if role_name=="Student" and not MasterData.objects.filter(email=user_data['email'], role__role_name=role_name,dob=user_dob,user_id=user_data.get('student_id')).exists():
                return Response({'error': 'User not found in master data'}, status=status.HTTP_400_BAD_REQUEST)
            
            if role_name=="Faculty" and not MasterData.objects.filter(email=user_data['email'], role__role_name=role_name,dob=user_dob,user_id=user_data.get('faculty_id'),date_of_joining=change_date(user_data.get('joined_date'))).exists():
                return Response({'error': 'User not found in master data'}, status=status.HTTP_400_BAD_REQUEST)
            
            if role_name=="Employee" and not MasterData.objects.filter(email=user_data['email'], role__role_name=role_name,dob=user_dob,user_id=user_data.get('employee_id'),date_of_joining=change_date(user_data.get('joined_date'))).exists():
                return Response({'error': 'User not found in master data'}, status=status.HTTP_400_BAD_REQUEST)
            
            if role_name=="Alumni" and not MasterData.objects.filter(email=user_data['email'], role__role_name=role_name,dob=user_dob,user_id=user_data.get('alumni_id')).exists():
                return Response({'error': 'User not found in master data'}, status=status.HTTP_400_BAD_REQUEST)
            
            if role_name=="ExEmployee" and not MasterData.objects.filter(email=user_data['email'], role__role_name=role_name,dob=user_dob,user_id=user_data.get('employee_id'),date_of_retirement=change_date(user_data.get('retirement_date'))).exists():
                return Response({'error': 'User not found in master data'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:                    
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            role_instance = Role.objects.get(role_name=role_name)
            
        except Role.DoesNotExist:
            return Response({'error': 'Role not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Register the user in UserAccount
        
        serializer = UserRegistrationSerializer(data=user_data)
        if serializer.is_valid():
            
            user = serializer.save()
            print(user_data)

            # Handle role-specific registration
            if role_name == "Student":
                 # print('upto degree is fine')
                try:
                    photo_file = request.FILES.get('photo')
                    id_proof_file = request.FILES.get('id_proof') 
                    
                    photo_binary = photo_file.read() if photo_file else None
                    id_proof_binary = id_proof_file.read() if id_proof_file else None

                    department_id = user_data.get('department')
                    degree_id = user_data.get('degree')
                        
                    department = Department.objects.get(name=department_id)
                    degree = Degree.objects.get(name=degree_id)
                    # print(user_data)
                    Student.objects.create(
                        user=user,
                        student_id=user_data.get('student_id'),
                        department= department,
                        gender=user_data.get('gender')[0],
                        address=user_data.get('address'),
                        contact_no=user_data.get('contact_no'),
                        father_name=user_data.get('father_name'),
                        mother_name=user_data.get('mother_name'),
                        aadhar_number=user_data.get('aadhar_number'),
                        dob= change_date(user_data.get('dob')),
                        degree= degree,
                        date_of_joining=change_date(user_data.get('date_of_joining')),
                        expected_date_of_completion=change_date(user_data.get('expected_date_of_completion')),
                        photo=photo_binary,
                        id_proof=id_proof_binary,
                    )

                except Exception as e:
                    user.delete()
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


            elif role_name == "Faculty":
                try:
                    department_id = user_data.get('department')
                    designation_id = user_data.get('designation')
                        
                    department = Department.objects.get(name=department_id)
                    designation = Designation.objects.get(name=designation_id)

                    Faculty.objects.create(
                        user = user,
                        faculty_id = user_data.get('faculty_id'),
                        department = department,
                        joined_date = change_date(user_data.get('joined_date')),
                        gender = user_data.get('gender')[0],
                        contact_no = user_data.get('contact_no'),
                        address = user_data.get('address'),
                        designation = designation,
                        aadhar = user_data.get('aadhar'),
                        dob = change_date(user_data.get('dob')),
                        landline = user_data.get('landline')
                    )
                except Exception as e:
                    user.delete()
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            elif role_name == "Employee":
                try:
                    department_id = user_data.get('department')
                    designation_id = user_data.get('designation')
                        
                    department = Department.objects.get(name=department_id)
                    designation = Designation.objects.get(name=designation_id)

                    Employee.objects.create(
                        user = user,
                        employee_id = user_data.get('employee_id'),
                        department = department,
                        joined_date = change_date(user_data.get('joined_date')),
                        gender = user_data.get('gender')[0],
                        contact_no = user_data.get('contact_no'),
                        address = user_data.get('address'),
                        designation = designation,
                        aadhar = user_data.get('aadhar'),
                        dob = change_date(user_data.get('dob')),
                        landline = user_data.get('landline')
                    )
                except Exception as e:
                    user.delete()
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            elif role_name == "Alumni":
                try:
                    photo_file = request.FILES.get('photo')
                    id_proof_file = request.FILES.get('id_proof') 
                    
                    photo_binary = photo_file.read() if photo_file else None
                    id_proof_binary = id_proof_file.read() if id_proof_file else None

                    department_id = user_data.get('department')
                    degree_id = user_data.get('degree')
                        
                    department = Department.objects.get(name=department_id)
                    degree = Degree.objects.get(name=degree_id)

                    Alumni.objects.create(
                        user = user,
                        alumni_id = user_data.get('alumni_id'),
                        department = department,
                        graduation_date = change_date(user_data.get('graduation_date')),
                        gender = user_data.get('gender')[0],
                        address = user_data.get('address'),
                        contact_no = user_data.get('contact_no'),
                        father_name = user_data.get('father_name'),
                        mother_name = user_data.get('mother_name'),
                        aadhar_number = user_data.get('aadhar_number'),
                        dob = change_date(user_data.get('dob')),
                        degree = degree,
                        photo = photo_binary,
                        id_proof = id_proof_binary
                    )
                except Exception as e:
                    user.delete()
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            elif role_name == "ExEmployee":  
                try:            
                    id_proof_file = request.FILES.get('id_proof') 
                    id_proof_binary = id_proof_file.read() if id_proof_file else None

                    department_id = user_data.get('department')
                    designation_id = user_data.get('designation')
                        
                    department = Department.objects.get(name=department_id)
                    designation = Designation.objects.get(name=designation_id)
                    ExEmployee.objects.create(
                        user = user,
                        employee_id = user_data.get('employee_id'),
                        department = department,
                        retirement_date = change_date(user_data.get('retirement_date')),
                        gender = user_data.get('gender')[0],
                        contact_no = user_data.get('contact_no'),
                        address = user_data.get('address'),
                        designation = designation,
                        aadhar = user_data.get('aadhar'),
                        dob = change_date(user_data.get('dob')),

                        id_proof = id_proof_binary
                    )
                except Exception as e:
                    user.delete()
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            # Handle other roles like Admin, Alumni, etc.
            
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    'username': user.username,
                    'role': user.role.role_name,
                },
                "message": "Login successful."
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get the refresh token from the request data
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token

            return Response({"message": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = request.data.get("refresh", None)
        
        if refresh is None:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        response = super().post(request, *args, **kwargs)

        if response.status_code == status.HTTP_200_OK:
            return Response({"access": response.data.get("access")}, status=status.HTTP_200_OK)
        else:
            # Return failure response from the parent method
            return Response(response.data, status=response.status_code)


class ForgotPasswordView(APIView):
    def post(self, request):
        try:
            email = request.data.get("email")

            user = UserAccount.objects.get(email=email,is_active=True)

            if user.last_otp_request and timezone.now() < user.last_otp_request + timedelta(minutes=1):
                return Response({"error": "Please wait before requesting a new OTP."}, status=status.HTTP_429_TOO_MANY_REQUESTS)

            if not user.totp_secret:
                user.totp_secret = pyotp.random_base32()
                user.save()

            totp = pyotp.TOTP(user.totp_secret, interval=300)

            otp = totp.now()
            # print(totp)
            # print(otp)
            send_otp_email(email, otp)
            user.last_otp_request = timezone.now()
            user.save()

            return Response({"message": "OTP sent to your email."}, status=status.HTTP_200_OK)

        except UserAccount.DoesNotExist:
            return Response({"error": "User does not exist or is inactive."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")
        otp_input = request.data.get("otp")

        try:
            user = UserAccount.objects.get(email=email)
            totp = pyotp.TOTP(user.totp_secret, interval=300)
            # print(otp_input)
            # print(totp)
            if not totp.verify(otp_input):
                print(f"Generated OTP: {totp.now()}")  # Log generated OTP
                print(f"Received OTP: {otp_input}")    # Log received OTP
                return Response({"error": "Invalid or expired OTP."}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "OTP verified successfully."}, status=status.HTTP_200_OK)

        except UserAccount.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")
        new_password = request.data.get("new_password")

        try:
            user = UserAccount.objects.get(email=email)

            if user.check_password(new_password):
                return Response({"error": "New password cannot be the same as the old password."}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()

            return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)

        except UserAccount.DoesNotExist:
            return Response({"error": "User does not exist."}, status=status.HTTP_400_BAD_REQUEST)



class FormOptionsView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            roles = Role.objects.exclude(role_name='Admin').values_list('role_name',flat=True)
            departments = Department.objects.values_list('name', flat=True)
            degrees = Degree.objects.values_list('name', flat=True)
            designations = Designation.objects.values_list('name', flat=True)
            
            
            response_data = {
                "roles": list(roles),
                "departments": list(departments),
                "degrees": list(degrees),
                "designations": list(designations)
            }
        
            return Response(response_data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ServiceListView(APIView):
    
    def get(self, request, *args, **kwargs):
        role_name = request.query_params.get('role')
        
        if role_name:
            try:
                role = Role.objects.get(role_name=role_name)
                services = Service.objects.filter(service_roles__role=role)
            except Role.DoesNotExist:
                return Response({"error": "Role not found."}, status=404)
        else:
            services = Service.objects.all()
        
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
