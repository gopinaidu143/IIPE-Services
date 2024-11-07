from django.core.management.base import BaseCommand
from api.models import MasterData, Role
from datetime import datetime

# Sample data for bulk insertion
data = [
    {"email": "student1@gmail.com", "user_id": "1234", "username": "Student IIPE", "dob": "2024-11-06", "role_name": "Student", "no_dependents": 1},
    {"email": "faculty1@gmail.com", "user_id": "F123", "username": "Faculty IIPE", "dob": "2024-11-06", "role_name": "Faculty", "no_dependents": 1, "date_of_joining": "2021-10-10"},
    {"email": "employee1@gmail.com", "user_id": "E123", "username": "Employee IIPE", "dob": "2024-11-06", "role_name": "Employee", "no_dependents": 1, "date_of_joining": "2003-06-15"},
    {"email": "exemployee1@gmail.com", "user_id": "EX123", "username": "ExEmployee IIPE", "dob": "2024-11-06", "role_name": "ExEmployee", "no_dependents": 1, "date_of_retirement": "2024-11-10"},
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
                # Retrieve the Role object
                role = Role.objects.get(role_name=user['role_name'])
                
                # Parse date fields, handling optional fields
                dob = datetime.strptime(user['dob'], "%Y-%m-%d").date()
                date_of_joining = datetime.strptime(user['date_of_joining'], "%Y-%m-%d").date() if 'date_of_joining' in user else None
                date_of_retirement = datetime.strptime(user['date_of_retirement'], "%Y-%m-%d").date() if 'date_of_retirement' in user else None

                # Create MasterData object and add to data_objects list
                data_objects.append(MasterData(
                    email=user['email'],
                    user_id=user['user_id'],
                    username=user['username'],
                    dob=dob,
                    role=role,
                    date_of_joining=date_of_joining,
                    date_of_retirement=date_of_retirement,
                    no_dependents=user['no_dependents']
                ))

            except Role.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"Role '{user['role_name']}' does not exist."))

        # Bulk insert data objects if any are valid
        if data_objects:
            MasterData.objects.bulk_create(data_objects)
            self.stdout.write(self.style.SUCCESS('Successfully added master data to the database.'))
        else:
            self.stdout.write(self.style.WARNING('No data was inserted.'))
