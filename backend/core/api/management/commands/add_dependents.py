from django.core.management.base import BaseCommand
from api.models import MasterData, Dependents
from api.utils import change_date
from django.core.exceptions import ValidationError



# Sample data for bulk insertion
data = [
    {"related_employee": "F123", "dependent_id": "FD1", "dependent_name": "Ravi", "dob": "1980-11-06", "gender": "M", "relation": "Father", "id_proof": "C:\\Users\\gopiv\\OneDrive\\Pictures\\pp.jpg"},
    {"related_employee": "F123", "dependent_id": "FD2", "dependent_name": "Raju", "dob": "1990-11-06", "gender": "F", "relation": "Mother", "id_proof": "C:\\Users\\gopiv\\OneDrive\\Pictures\\pp.jpg"},
    {"related_employee": "E123", "dependent_id": "ED1", "dependent_name": "Tom", "dob": "2002-11-06", "gender": "O", "relation": "Brother", "id_proof": "C:\\Users\\gopiv\\OneDrive\\Pictures\\pp.jpg"},
    {"related_employee": "E123", "dependent_id": "ED2", "dependent_name": "Tim", "dob": "1998-11-06", "gender": "M", "relation": "Sister", "id_proof": "C:\\Users\\gopiv\\OneDrive\\Pictures\\pp.jpg"},
]

class Command(BaseCommand):
    help = 'Load bulk data into the Dependents table'

    def handle(self, *args, **options):
        # Clear the table if necessary
        Dependents.objects.all().delete()

        # Prepare data for bulk insertion
        for user in data:
            try:
                # Retrieve the MasterData object
                employee = MasterData.objects.get(user_id=user['related_employee'])
                
                # Parse date fields
                dob = change_date(user['dob'])
                
                # Open the file in binary mode and read contents
                with open(user['id_proof'], 'rb') as id_proof_file:
                    id_proof_binary = id_proof_file.read()

                # Create Dependents object and add to data_objects list
                dependent = Dependents(
                    related_employee=employee,
                    dependent_id=user['dependent_id'],
                    dependent_name=user['dependent_name'],
                    dob=dob,
                    gender=user['gender'],
                    relation=user['relation'],
                    id_proof=id_proof_binary
                )

                dependent.save()
                

            except MasterData.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"'{user['related_employee']}' does not exist."))
            except ValidationError as e:
                self.stdout.write(self.style.ERROR(f"error   {e}"))
    
        self.stdout.write(self.style.SUCCESS('Successfully added dependents data to the database.'))
        
