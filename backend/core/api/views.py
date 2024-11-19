# views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.tokens import RefreshToken,TokenError
from rest_framework_simplejwt.views import TokenRefreshView
from .models import MasterData, Degree, Student, Faculty,Role,Employee,Alumni,ExEmployee,Department,Designation,UserAccount,Service,RoleServiceAssignment,Dependents,Hospital,OPDFormData
from .serializers import UserRegistrationSerializer,LoginSerializer,ServiceSerializer,MasterDataSerializer, DependentSerializer, HospitalSerializer,OPDUserSerializer,OPDAdminSerializer,DependentImaageSerializer
from django.shortcuts import get_object_or_404,render
import pyotp
from .send_mails import send_otp_email,send_opd_email,opd_rejected_email
from django.utils import timezone
from datetime import datetime, timedelta
from dateutil import parser
from .utils import change_date,generate_pdf
import uuid
import threading

from django.http import HttpResponse




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
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            refresh['username'] = user.username
            refresh['role'] = user.role.role_name
            refresh['email'] = user.email
            response =  Response({
                # 'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    'username': user.username,
                    'role': user.role.role_name,
                    
                },
                "message": "Login successful."
            }, status=status.HTTP_200_OK)
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                # secure=True,
                # samesite='Lax'
            )
            return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Attempt to retrieve the refresh token from cookies
        refresh_token = request.COOKIES.get("refresh_token")
        # print(refresh_token)
        # If the refresh token is missing, return an error response
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required for logout."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Create a RefreshToken instance from the token and blacklist it
            token = RefreshToken(refresh_token)
            token.blacklist()

            # Prepare the response and clear the refresh token cookie
            response = Response(
                {"message": "Successfully logged out"},
                status=status.HTTP_205_RESET_CONTENT
            )
            response.delete_cookie("refresh_token")

            return response

        except TokenError as e:
            # Handle cases where the token might already be expired or invalid
            return Response(
                {"error": "Invalid or expired refresh token."},
                status=status.HTTP_400_BAD_REQUEST
            )

            
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request):
        # Get the refresh token from the cookie
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "Refresh token missing."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Generate a new access token using the refresh token
            
            refresh = RefreshToken(refresh_token)
            access_token = refresh.access_token

            return Response({"access": str(access_token)}, status=status.HTTP_200_OK)
        
        except TokenError:
            return Response({"error": "Invalid or expired refresh token."}, status=status.HTTP_400_BAD_REQUEST)


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



class EmployeeDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, email_id):
        # Retrieve employee information
        try:
            # employee = get_object_or_404(MasterData, email=email_id, role__in=["faculty", "employee"])

            employee = get_object_or_404(MasterData, email=email_id)
            employee_data = MasterDataSerializer(employee).data

            # Retrieve dependents information for the employee

            dependents = Dependents.objects.filter(related_employee=employee)
            dependents_data = DependentSerializer(dependents, many=True).data

            # Retrieve all hospitals (optional: filter hospitals if needed)
            hospitals = Hospital.objects.all()
            hospitals_data = HospitalSerializer(hospitals, many=True).data

            # Construct response data
            data = {
                'employee': employee_data,
                'dependents': dependents_data,
                'hospitals': hospitals_data
            }
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class DependentDataView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, dependent_id):
        # Retrieve specific dependent information
        try:
            dependent = get_object_or_404(Dependents, dependent_id=dependent_id)
            dependent_data = DependentSerializer(dependent).data
            return Response(dependent_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

      

class OPDSubmissionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data   
            # print(data)        
            # Generate the referral ID (employee_code + random 5-digit code)
            referral_id = f"{data['employeeCode']}{uuid.uuid4().hex[:5].upper()}"
            # Create a new OPDFormData instance
            opd_form_data = OPDFormData(
                employee = MasterData.objects.get(user_id=data.get('employeeCode')),
                referral_id=referral_id,
                employee_name=data.get("employeeName"),
                employee_code=data.get("employeeCode"),
                contact_no=data.get("contactNumber"),
                dependent_name=data.get("DependentName"),
                dependent_id=data.get("DependentId"),
                relation_with_employee=data.get("relationshipWithEmployee"),
                dob=change_date(data.get("DateOfBirth")),
                age=data.get("DependentAge"),
                gender=data.get("DependentGender")[0].upper(),  # e.g., 'O' for Others
                tentative_visit_from=change_date(data.get("visitFromDate")),
                tentative_visit_to=change_date(data.get("visitToDate")),
                hospital_name=data.get("chosenHospital"),
            )
            data['referral_id']= referral_id
            opd_form_data.save()

            # Send email notification (if needed)
            applicant_name = data.get("employeeName")
            # email = 'surendrakoppala07@gmail.com'
            # # email = 'lab.cs@iipe.ac.in'

            # send_opd_email(email, applicant_name, data)
            print('successfully submitted')
            return Response({"message": "Form successfully submitted!", "referral_id": referral_id}, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class UserOPDListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            data = OPDFormData.objects.filter(employee__email=id)

            if not data.exists():
                return Response({"message": "Data not found!"}, status=status.HTTP_404_NOT_FOUND)

            serializer = OPDUserSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class AdminOPDListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            data = OPDFormData.objects.all()

            if not data.exists():
                return Response({"message": "Data not found!"}, status=status.HTTP_404_NOT_FOUND)

            serializer = OPDAdminSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class ApproveRecord(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, record_id):
        try:
            record = OPDFormData.objects.get(referral_id=record_id)
            record.status = 'approved'
            record.approved_rejected_by = request.user.username
            record.approved_rejected_at = timezone.now()
            record.save()
            # generates the pdf with loding the html template with our model data and convert it into pdf and stores the pdf in binary formet 
            pdf_thread = threading.Thread(target=generate_pdf, args=(request,record_id,))
            pdf_thread.start()
            print('successfully accepted')
            return Response({'message': 'Record approved successfully'}, status=status.HTTP_200_OK)
        except OPDFormData.DoesNotExist:
            return Response({'error': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)
        


class RejectRecord(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, record_id):
        try:
            record = OPDFormData.objects.get(referral_id=record_id)
            record.status = 'rejected'
            record.approved_rejected_by = request.user.username
            record.approved_rejected_at = timezone.now()
            record.save()
            print('successfully rejected')

            rejected_thread = threading.Thread(target=opd_rejected_email, args=(record.employee.email,record_id,))
            rejected_thread.start()
            
            return Response({'message': 'Record rejected successfully'}, status=status.HTTP_200_OK)
        except OPDFormData.DoesNotExist:
            return Response({'error': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)



       
def preview_pdf(request, doc_id):
    try:
        # Fetch the document based on the provided referral_id (doc_id)
        document = OPDFormData.objects.get(referral_id=doc_id)
    except OPDFormData.DoesNotExist:
        return HttpResponse("Document not found", status=404)

    # Serve the PDF as a response
    response = HttpResponse(document.opd_form, content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="{doc_id}-opd-form.pdf"'  # Display inline in the browser
    return response














# def opd(request):
    
#         record_id = 'E123C736E'
    
#         record = OPDFormData.objects.get(referral_id=record_id)
#         record.approved_rejected_at = record.approved_rejected_at.date()
#         record.created_at = record.created_at.date()
#         dependent_image = Dependents.objects.get(dependent_id=record.dependent_id)
#         dependent_img = DependentImaageSerializer(dependent_image).data
#         employee_type = MasterData.objects.filter(username=record.employee_name).values('employee_type').first()
#         print(employee_type)
#         # print(record)
#         # print(dependent_img)

#         return render(request, 'opd.html', {'opd_form':record,'dependent_img': dependent_img['id_proof_base64'],'employee_type': employee_type['employee_type']})
        

