from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import MaxValueValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _





class Role(models.Model):
    role_name = models.CharField(max_length=50, unique=True)  # e.g., 'Student', 'Faculty', etc.
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.role_name
    
class Service(models.Model):
    service_name = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.service_name

# Many-to-many relationship for Role and Service
class RoleServiceAssignment(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name="role_services")
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="service_roles")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('role', 'service')

    def __str__(self):
        return f"{self.role.role_name} - {self.service.service_name}"


class Hospital(models.Model):
    hospital_name = models.TextField(null=False)
    contact_details = models.TextField(null=False)
    remarks = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.hospital_name

class MasterData(models.Model):
    email = models.EmailField(unique=True)
    user_id = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100)
    dob = models.DateField()
    date_of_joining = models.DateField(null=True,blank=True)
    date_of_retirement = models.DateField(null=True,blank=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    no_dependents = models.PositiveIntegerField(validators=[MaxValueValidator(7)])
    contact_no = models.CharField(max_length=10)
    employee_type = models.CharField(max_length=50,choices=[('contract', 'Contract'), ('regular', 'Regular')])
    is_active = models.BooleanField(default=True)


    def __str__(self):
        return f"{self.username} - {self.role}"
    

class Dependents(models.Model):
    related_employee = models.ForeignKey(MasterData, on_delete=models.CASCADE, related_name='dependents')
    dependent_id = models.CharField(max_length=20)
    dependent_name = models.CharField(max_length=100)
    dob = models.DateField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')]) 
    relation = models.CharField(max_length=50)  
    id_proof = models.BinaryField(null=True, blank=True)
    is_exist = models.BooleanField(default=True)  # Marks existence status
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.related_employee.username} - {self.dependent_name} ({self.relation})"
    
    def clean(self):
        allowed_roles = ['faculty', 'employee']
        if self.related_employee.role.role_name.lower() not in allowed_roles:
            raise ValidationError(_("Dependents can only be added for faculty or employee roles."))

        current_dependents_count = self.related_employee.dependents.count()
        if current_dependents_count >= self.related_employee.no_dependents:
            raise ValidationError(_("Cannot add more than %(max_dependents)s dependents."),
                                  params={'max_dependents': self.related_employee.no_dependents})

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    head_of_department = models.CharField(max_length=100, null=True, blank=True)  # Optional field for additional info
    department_code = models.CharField(max_length=5,unique=True,null=False,blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Degree(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Designation(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(null=True, blank=True)  # Optional field for additional info
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


#hospital table


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_admin', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    role = models.ForeignKey(Role, on_delete=models.PROTECT)
    username = models.CharField(max_length=225)
    first_name = models.CharField(max_length=225)
    last_name = models.CharField(max_length=225)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    totp_secret = models.CharField(max_length=64, blank=True, null=True) 
    last_otp_request = models.DateTimeField(null=True, blank=True)





    groups = models.ManyToManyField(
        'auth.Group',
        related_name='user_account_set',  # Custom related name for 'groups'
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='user_account_permissions_set',  # Custom related name for 'user_permissions'
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def get_username(self):
        return f"{self.first_name} {self.last_name}" 


class Student(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.PROTECT)
    student_id = models.CharField(max_length=20)
    department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name="students")
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    address = models.TextField(max_length=500)
    contact_no = models.CharField(max_length=10)
    father_name = models.CharField(max_length=100)
    mother_name = models.CharField(max_length=100)
    aadhar_number = models.CharField(max_length=12)
    dob = models.DateField()
    degree = models.ForeignKey(Degree, on_delete=models.PROTECT, related_name="students")
    date_of_joining = models.DateField()
    expected_date_of_completion = models.DateField()
    photo = models.BinaryField(null=True, blank=True)
    id_proof = models.BinaryField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.student_id
    
class Faculty(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.PROTECT)
    faculty_id = models.CharField(max_length=20)
    department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name="faculty")
    joined_date = models.DateField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    contact_no = models.CharField(max_length=10)
    address = models.TextField(max_length=500)
    designation = models.ForeignKey(Designation, on_delete=models.PROTECT, related_name="faculty")
    aadhar = models.CharField(max_length=12)
    dob = models.DateField()
    landline = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.faculty_id

class Employee(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    employee_id = models.CharField(max_length=20)
    department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name="employee")
    joined_date = models.DateField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    contact_no = models.CharField(max_length=10)
    address = models.TextField(max_length=500)
    designation = models.ForeignKey(Designation, on_delete=models.PROTECT, related_name="employee")
    aadhar = models.CharField(max_length=12)
    dob = models.DateField()
    landline = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.employee_id

class Alumni(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    alumni_id = models.CharField(max_length=20)
    department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name="alumini")
    graduation_date= models.DateField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    address = models.TextField(max_length=500)
    contact_no = models.CharField(max_length=10)
    father_name = models.CharField(max_length=100)
    mother_name = models.CharField(max_length=100)
    aadhar_number = models.CharField(max_length=12)
    dob = models.DateField()
    degree = models.ForeignKey(Degree, on_delete=models.PROTECT, related_name="alumini")
    photo = models.BinaryField(null=True, blank=True)
    id_proof = models.BinaryField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.alumni_id

class ExEmployee(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    employee_id = models.CharField(max_length=20)
    department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name="exemployee")
    retirement_date = models.DateField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    contact_no = models.CharField(max_length=10)
    address = models.TextField(max_length=500)
    designation = models.ForeignKey(Designation, on_delete=models.PROTECT, related_name="exemployee")
    aadhar = models.CharField(max_length=12)
    dob = models.DateField()
    id_proof = models.BinaryField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.employee_id


class Admin(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    admin_id = models.CharField(max_length=20)
    contact_no = models.CharField(max_length=10)
    address = models.TextField(max_length=500)
    designation = models.ForeignKey(Designation, on_delete=models.PROTECT, related_name="admin")
    department = models.ForeignKey(Department, on_delete=models.PROTECT, related_name="admin")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.admin_id




class OPDFormData(models.Model):
    referral_id = models.CharField(max_length=15, unique=True, editable=False)
    employee = models.ForeignKey(MasterData, on_delete=models.CASCADE, related_name="opd_forms") 
    employee_name = models.CharField(max_length=255)
    employee_code = models.CharField(max_length=50)
    dependent_name = models.CharField(max_length=255)
    dependent_id = models.CharField(max_length=50)
    relation_with_employee = models.CharField(max_length=50)
    dob = models.DateField()
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')])
    contact_no = models.CharField(max_length=10)
    tentative_visit_from = models.DateField()
    tentative_visit_to = models.DateField()
    hospital_name = models.TextField(null=False)
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    approved_rejected_by = models.CharField(max_length=255)
    approved_rejected_at = models.DateTimeField(null=True, blank=True)
    opd_form = models.BinaryField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.employee_name} - {self.referral_id}"


 
class Circulars(models.Model):
    c_type = models.CharField(max_length=50)
    publish_id = models.CharField(max_length=10)
    date = models.DateField()
    issued_department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="dept_issued")
    subject = models.TextField()
    view_pdf = models.BinaryField(null=True, blank=True)
    uploaded_by = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    unpublished = models.BooleanField(default=False)
    access_to = models.ManyToManyField(Role, related_name="circulars")  # Many-to-many relationship

    def _str_(self):
        return f'{self.publish_id} - {self.c_type}'
    
class Event(models.Model):
    event_name = models.CharField(max_length=255)
    organizer = models.CharField(max_length=50)
    event_id = models.CharField(max_length=10)
    event_type = models.CharField(max_length=50)
    from_date = models.DateField()
    to_date = models.DateField()
    organized_department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="dept_organized")
    subject = models.TextField()
    venue = models.CharField(max_length=100)
    view_pdf = models.BinaryField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    unpublished = models.BooleanField(default=False)


class Memo(models.Model):
    reference_id = models.CharField(max_length=20)
    memo_type = models.CharField(max_length=50)
    issued_date = models.DateField()
    subject = models.TextField()
    view_pdf = models.BinaryField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    unpublished = models.BooleanField(default=False)

class EmailRequisition(models.Model):
    name = models.CharField(max_length=150)
    program = models.CharField(max_length=150)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="user_dept")
    person_email = models.EmailField()
    contact_no = models.CharField(max_length=12)
    emergency_contact = models.CharField(max_length=12)
    hostler_dayscholar = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_resolved = models.BooleanField(default=False)
    resolved_by = models.CharField(max_length=255)



class SoftwareRequisition(models.Model):
    name = models.CharField(max_length=150)
    program = models.CharField(max_length=150)
    roll_no = models.CharField(max_length=15)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="requested_dept")
    email = models.EmailField()
    contact_no = models.CharField(max_length=12)
    hostler_dayscholar = models.CharField(max_length=20)
    purpose = models.TextField()
    remote_access = models.CharField(max_length=50)
    choosen_os = models.CharField(max_length=50)
    from_date = models.DateField()
    to_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_resolved = models.BooleanField(default=False)
    resolved_by = models.CharField(max_length=255)


