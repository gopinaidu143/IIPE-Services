from django.core.management.base import BaseCommand
from api.models import MasterData, Role
from datetime import date

# Sample data for bulk insertion
data = [
    {"email": "student1@gmail.com", "user_id": "1234", "username": "Student IIPE", "dob": "2024-11-06", "role_name": "Student", "no_dependents": 1},
    {"email": "faculty1@gmail.com", "user_id": "F123", "username": "Faculty IIPE", "dob": "2024-11-06", "role_name": "Faculty", "no_dependents": 1},
    {"email": "employee1@gmail.com", "user_id": "E123", "username": "Employee IIPE", "dob": "2024-11-06", "role_name": "Employee", "no_dependents": 1},
    {"email": "exemployee1@gmail.com", "user_id": "EX123", "username": "ExEmployee IIPE", "dob": "2024-11-06", "role_name": "ExEmployee", "no_dependents": 1},
    {"email": "alumni1@gmail.com", "user_id": "A123", "username": "Alumni IIPE", "dob": "2024-11-06", "role_name": "Alumni", "no_dependents": 1},
]

class Command(BaseCommand):
    help = 'Load bulk data into the MasterData table'

    def handle(self, *args, **options):
        # Clear the table if necessary
        MasterData.objects.all().delete()

        # Prepare data for bulk insertion
        data_objects = []
        for user in data:
            try:
                role = Role.objects.get(role_name=user['role_name'])
                data_objects.append(MasterData(
                    email=user['email'],
                    user_id=user['user_id'],
                    username=user['username'],
                    dob=user['dob'],
                    role=role,
                    no_dependents=user['no_dependents']
                ))
            except Role.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"Role '{user['role_name']}' does not exist."))

        # Bulk insert data objects if any are valid
        if data_objects:
            MasterData.objects.bulk_create(data_objects)
            self.stdout.write(self.style.SUCCESS('Successfully added masterdata to the database.'))
        else:
            self.stdout.write(self.style.WARNING('No data was inserted.'))
