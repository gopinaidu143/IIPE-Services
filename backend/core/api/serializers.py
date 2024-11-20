from rest_framework import serializers
from dateutil import parser
from .models import (UserAccount, MasterData, Student, Faculty, Admin,Role,
                     Service,Dependents,Hospital,OPDFormData,Circulars,
                     Department,Event,Memo,EmailRequisition,SoftwareRequisition)
from django.contrib.auth import authenticate
from django.db import models
import base64



class UserRegistrationSerializer(serializers.ModelSerializer):
    role = serializers.CharField()

    class Meta:
        model = UserAccount
        fields = ['email', 'password', 'username', 'role', 'first_name', 'last_name']

    def validate_role(self, value):
        """Validate that the role exists in the Role model."""
        if not Role.objects.filter(role_name=value).exists():
            raise serializers.ValidationError({'role': 'Role does not exist.'})
        return value

    def create(self, validated_data):
        role_name = validated_data.pop('role')  # Get the role from validated data
        role = Role.objects.get(role_name=role_name)  # Retrieve the Role instance
        
        user = UserAccount.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            role = role
        )
          # Assign the role to the user
        user.save()  # Save the user instance

        return user
    
 # Assuming UserAccount is your user model

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    role = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')
        print(f"Authenticating email: {email}, password: {password}, role: {role}")

        if not (email and password and role):
            raise serializers.ValidationError("Email, password, and role are required fields.")

        user = UserAccount.objects.filter(email=email, role__role_name=role).first()
        if not user:
            raise serializers.ValidationError("User with provided email and role not found.")
        
        user = authenticate(username=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid email or password.")
        
        if not user.is_active:
            raise serializers.ValidationError("This user account is inactive.")
        
        data['user'] = user
        return data


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['service_name', 'description']



class MasterDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterData
        fields = ['username', 'contact_no', 'user_id']  # Customize fields as needed

class DependentSerializer(serializers.ModelSerializer):
    id_proof_base64 = serializers.SerializerMethodField()

    class Meta:
        model = Dependents
        fields = ['dependent_id', 'dependent_name', 'dob', 'gender', 'relation', 'id_proof_base64']

    def get_id_proof_base64(self, obj):
        if obj.id_proof:
            # Convert binary image data to Base64 string
            return base64.b64encode(obj.id_proof).decode('utf-8')
        return None

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['hospital_name', 'contact_details', 'remarks']




class OPDUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = OPDFormData
        fields = ['referral_id','dependent_id','dependent_name','relation_with_employee','created_at','hospital_name','status','approved_rejected_at','approved_rejected_by','tentative_visit_to']  



class OPDAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = OPDFormData
        fields = ['referral_id','dependent_id','dependent_name','relation_with_employee','created_at','hospital_name','status']


class DependentImaageSerializer(serializers.ModelSerializer):
    id_proof_base64 = serializers.SerializerMethodField()

    class Meta:
        model = Dependents
        fields = ['id_proof_base64']

    def get_id_proof_base64(self, obj):
        if obj.id_proof:
            # Convert binary image data to Base64 string
            return base64.b64encode(obj.id_proof).decode('utf-8')
        return None
    


class CircularSerializer(serializers.ModelSerializer):
    access_to = serializers.ListField(
        child=serializers.CharField(), 
        write_only=True
    )
    view_pdf = serializers.FileField(write_only=True) 
    issued_by = serializers.CharField(write_only=True)
    date = serializers.DateField(input_formats=["%Y-%m-%d", "%d-%m-%Y"], write_only=True)

    class Meta:
        model = Circulars
        fields = [
            'c_type', 'publish_id', 'date', 'issued_by', 
            'subject', 'view_pdf', 'uploaded_by', 
            'is_published', 'access_to'
        ]

    def create(self, validated_data):
        role_names = validated_data.pop('access_to', [])
        
        print(role_names)
        roles = Role.objects.filter(role_name__in=role_names)
        issued_department = validated_data.pop('issued_by', None)
        if not roles.exists():
            raise serializers.ValidationError({"access_to": "One or more roles do not exist."})
        if issued_department:
            issued_department = Department.objects.filter(name=issued_department).first()
            if not issued_department:
                raise serializers.ValidationError({"issued_by": f"Department does not exist."})

        pdf_file = validated_data.pop("view_pdf", None)
        pdf_binary = pdf_file.read() if pdf_file else None  # Convert file to binary

        # Create the Circulars instance
        circular = Circulars.objects.create(
            issued_department=issued_department,
            view_pdf=pdf_binary,
            **validated_data
        )
        circular.access_to.set(roles)  # Set the many-to-many relationship
        return circular
    

class EventSerializer(serializers.ModelSerializer):
    organized_department = serializers.CharField(write_only=True)  # Accept department name as input
    view_pdf = serializers.FileField(write_only=True, required=False)  # Handle PDF upload
    from_date = serializers.DateField(input_formats=["%Y-%m-%d", "%d-%m-%Y"], write_only=True)
    to_date = serializers.DateField(input_formats=["%Y-%m-%d", "%d-%m-%Y"], write_only=True)

    class Meta:
        model = Event
        fields = [
            "event_name", "organizer", "event_id", "event_type", "from_date",
            "to_date", "organized_department", "subject", "venue", "view_pdf",
            "is_published"
        ]

    def create(self, validated_data):
        # Handle foreign key relationship for 'organized_department'
        department_name = validated_data.pop("organized_department", None)
        department = Department.objects.filter(name=department_name).first()

        if not department:
            raise serializers.ValidationError({"organized_department": "Department does not exist."})

        # Handle binary conversion for 'view_pdf'
        pdf_file = validated_data.pop("view_pdf", None)
        pdf_binary = pdf_file.read() if pdf_file else None

        # Create the Event instance
        event = Event.objects.create(
            organized_department=department,
            view_pdf=pdf_binary,
            **validated_data
        )

        return event
    



class MemoSerializer(serializers.ModelSerializer):
    view_pdf = serializers.FileField(write_only=True, required=False)  # Handle PDF upload
    issued_date = serializers.DateField(input_formats=["%Y-%m-%d", "%d-%m-%Y"], write_only=True)

    class Meta:
        model = Memo
        fields = [
            "reference_id", "memo_type", "issued_date", "subject", 
            "view_pdf", "is_published"
        ]

    def create(self, validated_data):
        # Handle binary conversion for 'view_pdf'
        pdf_file = validated_data.pop("view_pdf", None)
        pdf_binary = pdf_file.read() if pdf_file else None

        # Create the Memo instance
        memo = Memo.objects.create(
            view_pdf=pdf_binary,
            **validated_data
        )

        return memo
    
class EmailRequisitionSerializer(serializers.ModelSerializer):
    department = serializers.CharField(write_only=True)  # Accept department name as input

    class Meta:
        model = EmailRequisition
        fields = [
            "name", "program", "department", "person_email", 
            "contact_no", "emergency_contact", "hostler_dayscholar"
            
        ]

    def create(self, validated_data):
        # Extract the department name from the validated data
        department_name = validated_data.pop("department", None)
        department = Department.objects.filter(name=department_name).first()
        
        if not department:
            raise serializers.ValidationError({"department": "Department not found."})
        
        # Associate the department object with the requisition
       
        return EmailRequisition.objects.create(
            department=department,
            **validated_data)




class SoftwareRequisitionSerializer(serializers.ModelSerializer):
    department = serializers.CharField(write_only=True)  # Accept department name as input
    from_date = serializers.DateField(input_formats=["%Y-%m-%d", "%d-%m-%Y"], write_only=True)
    to_date = serializers.DateField(input_formats=["%Y-%m-%d", "%d-%m-%Y"], write_only=True)
    class Meta:
        model = SoftwareRequisition
        fields = [
            "name", "program", "roll_no", "department", "email", 
            "contact_no", "hostler_dayscholar", "purpose", 
            "remote_access", "choosen_os", "from_date", "to_date"
        ]

    def create(self, validated_data):
        # Map department name to Department model
        department_name = validated_data.pop("department", None)
        department = Department.objects.filter(name=department_name).first()
        if not department:
            raise serializers.ValidationError({"department": "Department not found."})
        
        # Create the SoftwareRequisition instance
        return SoftwareRequisition.objects.create(department=department, **validated_data)

# class RoleSpecificSerializer(serializers.Serializer):
#     # Add specific fields for roles, e.g., for Student
#     student_id = serializers.CharField(max_length=20, required=False)
#     faculty_id = serializers.CharField(max_length=20, required=False)
#     # etc.