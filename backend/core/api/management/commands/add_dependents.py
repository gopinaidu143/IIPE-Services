# from django.core.management.base import BaseCommand
# from api.models import MasterData, Dependents
# from api.utils import change_date
# from django.core.exceptions import ValidationError



# # Sample data for bulk insertion
# data = [
#     {"related_employee": "F123", "dependent_id": "FD1", "dependent_name": "Ravi", "dob": "1980-11-06", "gender": "M", "relation": "Father", "id_proof": "C:\\Users\\suren\\Downloads\\services dummy data\\66kb.jpg"},
#     {"related_employee": "F123", "dependent_id": "FD2", "dependent_name": "Raju", "dob": "1990-11-06", "gender": "F", "relation": "Mother", "id_proof": "C:\\Users\\suren\\Downloads\\services dummy data\\WhatsApp Image 2024-02-13 at 06.56.12_9c02187e.jpg"},
#     {"related_employee": "E123", "dependent_id": "ED1", "dependent_name": "Tom", "dob": "2002-11-06", "gender": "O", "relation": "Brother", "id_proof": "C:\\Users\\suren\\Downloads\\services dummy data\\66kb.jpg"},
#     {"related_employee": "E123", "dependent_id": "ED2", "dependent_name": "Tim", "dob": "1998-11-06", "gender": "M", "relation": "Sister", "id_proof": "C:\\Users\\suren\\Downloads\\services dummy data\\WhatsApp Image 2024-02-13 at 06.56.12_9c02187e.jpg"},
# ]

# class Command(BaseCommand):
#     help = 'Load bulk data into the Dependents table'

#     def handle(self, *args, **options):
#         # Clear the table if necessary
#         Dependents.objects.all().delete()

#         # Prepare data for bulk insertion
#         for user in data:
#             try:
#                 # Retrieve the MasterData object
#                 employee = MasterData.objects.get(user_id=user['related_employee'])
                
#                 # Parse date fields
#                 dob = change_date(user['dob'])
                
#                 # Open the file in binary mode and read contents
#                 with open(user['id_proof'], 'rb') as id_proof_file:
#                     id_proof_binary = id_proof_file.read()

#                 # Create Dependents object and add to data_objects list
#                 dependent = Dependents(
#                     related_employee=employee,
#                     dependent_id=user['dependent_id'],
#                     dependent_name=user['dependent_name'],
#                     dob=dob,
#                     gender=user['gender'],
#                     relation=user['relation'],
#                     id_proof=id_proof_binary
#                 )

#                 dependent.save()
                

#             except MasterData.DoesNotExist:
#                 self.stdout.write(self.style.ERROR(f"'{user['related_employee']}' does not exist."))
#             except ValidationError as e:
#                 self.stdout.write(self.style.ERROR(f"error   {e}"))
    
#         self.stdout.write(self.style.SUCCESS('Successfully added dependents data to the database.'))
        




import csv
from django.core.management.base import BaseCommand
from api.models import MasterData, Dependents
from api.utils import change_date
from django.core.exceptions import ValidationError

class Command(BaseCommand):
    help = 'Load bulk data into the Dependents table from a CSV file'

    def handle(self, *args, **options):
        # Path to your CSV file
        csv_file_path = "C:/Users/gopiv/Downloads/services data/dependents.csv"

        # Clear the table if necessary
        Dependents.objects.all().delete()

        try:
            # Open the CSV file and read data
            with open(csv_file_path, newline='', encoding='utf-8-sig') as csvfile:
                csvreader = csv.DictReader(csvfile)

                # Clean headers by stripping spaces and any BOM character
                csvreader.fieldnames = [field.strip() for field in csvreader.fieldnames]
                
                # Check if 'related_employee' column exists
                if 'related_employee' not in csvreader.fieldnames:
                    self.stdout.write(self.style.ERROR("Column 'related_employee' not found in the CSV file"))
                    return

                # Prepare data for bulk insertion
                for row in csvreader:
                    if not row:  # Skip empty rows
                        continue
                    
                    try:
                        # Retrieve the MasterData object
                        employee = MasterData.objects.get(user_id=row['related_employee'])
                        
                        # Parse date fields
                        dob = change_date(row['dob'])
                        
                        # Open the file in binary mode and read contents
                        with open(row['id_proof'], 'rb') as id_proof_file:
                            id_proof_binary = id_proof_file.read()

                        # Create Dependents object and save to the database
                        dependent = Dependents(
                            related_employee=employee,
                            dependent_id=row['dependent_id'],
                            dependent_name=row['dependent_name'],
                            dob=dob,
                            gender=row['gender'],
                            relation=row['relation'],
                            id_proof=id_proof_binary
                        )

                        dependent.save()
                        
                    except MasterData.DoesNotExist:
                        self.stdout.write(self.style.ERROR(f"'{row['related_employee']}' does not exist."))
                    except ValidationError as e:
                        self.stdout.write(self.style.ERROR(f"Validation error: {e}"))
                    except FileNotFoundError:
                        self.stdout.write(self.style.ERROR(f"File not found: {row['id_proof']}"))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Error processing row {row}: {e}"))

            self.stdout.write(self.style.SUCCESS('Successfully added dependents data to the database.'))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"CSV file '{csv_file_path}' not found"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error reading the CSV file: {e}"))
