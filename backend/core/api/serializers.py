from rest_framework import serializers
from .models import UserAccount, MasterData, Student, Faculty, Admin,Role
from django.contrib.auth import authenticate
from django.db import models

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
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    role = serializers.CharField()

    def validate(self, data):
        from django.contrib.auth import authenticate
from rest_framework import serializers
from api.models import UserAccount  # Assuming UserAccount is your user model

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


# class RoleSpecificSerializer(serializers.Serializer):
#     # Add specific fields for roles, e.g., for Student
#     student_id = serializers.CharField(max_length=20, required=False)
#     faculty_id = serializers.CharField(max_length=20, required=False)
#     # etc.