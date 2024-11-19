from rest_framework import serializers
from .models import UserAccount, MasterData, Student, Faculty, Admin,Role,Service,Dependents,Hospital,OPDFormData
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

# class RoleSpecificSerializer(serializers.Serializer):
#     # Add specific fields for roles, e.g., for Student
#     student_id = serializers.CharField(max_length=20, required=False)
#     faculty_id = serializers.CharField(max_length=20, required=False)
#     # etc.