# from django.core.management.base import BaseCommand
# from  api.models import Designation

# # Sample data for bulk insertion
# DESIGNATIONS = [
#     {"name": "ADIR"},
#     {"name": "ASSISTANT ENGINEER ELECTRICAL"},
#     {"name": "ASSISTANT EXECUTIVE ENGINEER"},
#     {"name": "ASSISTANT EXECUTIVE ENGINEER (SENIOR SCALE)"},
#     {"name": "ASSISTANT LIBRARIAN"},
#     {"name": "ASSISTANT PROFESSOR"},
#     {"name": "ASSISTANT PROFESSOR GRADE - I"},
#     {"name": "ASSISTANT PROFESSOR GRADE - II"},
#     {"name": "ASSISTANT REGISTRAR"},
#     {"name": "ASSISTANT REGISTRAR (SENIOR SCALE)"},
#     {"name": "ASSISTANT SPORTS OFFICER"},
#     {"name": "ASSISTANT SPORTS OFFICER (SENIOR SCALE)"},
#     {"name": "ASSO. PROFESSOR"},
#     {"name": "ASSOCIATE PROFESSOR"},
#     {"name": "Asst. Security Officer"},
#     {"name": "ASSTT. EXECUTIVE ENGINEER"},
#     {"name": "Asstt. Librarian"},
#     {"name": "ASSTT. PROFESSOR"},
#     {"name": "ASSTT. REGISTRAR"},
#     {"name": "Asstt. Sports Officer"},
#     {"name": "ASSTT. SUPDT. WORKSHOP (S.S.)"},
#     {"name": "CHAIRMAN GATE-JAM"},
#     {"name": "CHAIRMAN HINDI CELL"},
#     {"name": "CHAIRMAN IPR CELL"},
#     {"name": "CHAIRPERSON GATE-JAM"},
#     {"name": "COACH"},
#     {"name": "COORDINATOR"},
#     {"name": "COORDINATOR (DIC)"},
#     {"name": "COUNSELLOR"},
#     {"name": "DEAN ACADEMIC AFFAIRS"},
#     {"name": "DEAN ADMINISTRATOR"},
#     {"name": "DEAN ALUMNI"},
#     {"name": "DEAN FACALTY AFFAIRS"},
#     {"name": "DEAN FINANCE AND PLANNING"},
#     {"name": "DEAN INFRASTRUCTURE"},
#     {"name": "DEAN RESOURCES AND ALUMNI AFFAIRS"},
#     {"name": "DEAN SRIC"},
#     {"name": "DEAN STUDENTS WELFARE"},
#     {"name": "DEPUTY LIBRARIAN"},
#     {"name": "DEPUTY REGISTRAR"},
#     {"name": "DIRECTOR"},
#     {"name": "DY. REGISTRAR"},
#     {"name": "EXECUTIVE ENGINEER"},
#     {"name": "EXECUTIVE ENGINEER (ELET./MECH.)"},
#     {"name": "FACULTY"},
#     {"name": "Faculty Advisor"},
#     {"name": "FINANCE OFFICER"},
#     {"name": "FOREMAN"},
#     {"name": "GROUP A OFFICER"},
#     {"name": "GROUP B"},
#     {"name": "GROUP C"},
#     {"name": "HOD"},
#     {"name": "HOSPITALITY OFFICER"},
#     {"name": "INSTITUTE ARCHITECT"},
#     {"name": "INSTITUTE ENGINEER"},
#     {"name": "JOINT REGISTRAR"},
#     {"name": "Jr. Asstt."},
#     {"name": "Jr. Superintendent"},
#     {"name": "JTS"},
#     {"name": "JUNIOR ASSISTANT"},
#     {"name": "JUNIOR ENGINEER"},
#     {"name": "JUNIOR ENGINEER CIVIL"},
#     {"name": "JUNIOR LAB ASSISTANT"},
#     {"name": "JUNIOR LABORATORY ASSISTANT"},
#     {"name": "JUNIOR LIBRARY INFORMATION ASSISTANT"},
#     {"name": "JUNIOR SUPERINTENDENT"},
#     {"name": "JUNIOR TECHNICAL ARCHITECT"},
#     {"name": "JUNIOR TECHNICAL SUPD. PATHOLOGY"},
#     {"name": "JUNIOR TECHNICAL SUPERINTENDENT"},
#     {"name": "Lab Supdt."},
#     {"name": "Librarian"},
#     {"name": "LIBRARY INFORMATION OFFICER"},
#     {"name": "O.S.D. MANAGEMENT"},
#     {"name": "OTHER STAFF"},
#     {"name": "P.S. TO DIRECTOR"},
#     {"name": "PHYSICAL TRAINING INSTRUCTOR GRADE I"},
#     {"name": "PROF.-IN-CHARGE GUEST HOUSE"},
#     {"name": "PROF.-IN-CHARGE SECURITY"},
#     {"name": "PROF.-IN-CHARGE TRAINING AND PLACEMENT"},
#     {"name": "PROFESSOR"},
#     {"name": "PROFESSOR HAG"},
#     {"name": "Project Officer"},
#     {"name": "REGISTRAR"},
#     {"name": "S.O. (SCIENTIFIC OFFICER)"},
#     {"name": "S.O. (SECURITY OFFICER)"},
#     {"name": "S.S.O. (SR. SCIENTIFIC OFFICER)"},
#     {"name": "SAFETY OFFICER"},
#     {"name": "SECURITY OFFICER S.S"},
#     {"name": "SENIOR ASSISTANT"},
#     {"name": "SENIOR LAB ASSISTANT"},
#     {"name": "SENIOR PHARMACIST"},
#     {"name": "SENIOR SCIENTIFIC OFFICER"},
#     {"name": "SENIOR STAFF NURSE"},
#     {"name": "SENIOR SUPERINTENDENT"},
#     {"name": "SENIOR SUPERINTENDENT (S.G.)"},
#     {"name": "SENIOR TECHNICAL SUPERINTENDENT"},
#     {"name": "Sports Officer"},
#     {"name": "Sr. Asstt."},
#     {"name": "SR. DEPUTY SECURITY OFFICER"},
#     {"name": "STAFF NURSE GRADE I"},
#     {"name": "STUDENT"},
#     {"name": "Superintendent"},
#     {"name": "SYSTEM PROGRAMMER"},
#     {"name": "TECHNICAL OFFICER"},
#     {"name": "TECHNICAL OFFICER - I"},
#     {"name": "TECHNICAL OFFICER - I (S.S.)"},
#     {"name": "TECHNICAL OFFICER - II"},
#     {"name": "Technical Superintendent"},
# ]


# class Command(BaseCommand):
#     help = 'Load bulk designations into the Designation table'

#     def handle(self, *args, **options):
#         # Clear the table if necessary
#         Designation.objects.all().delete()

#         # Create designation instances from DESIGNATIONS
#         designation_objects = [Designation(name=designation['name']) for designation in DESIGNATIONS]

#         # Bulk insert the designations
#         Designation.objects.bulk_create(designation_objects)

#         self.stdout.write(self.style.SUCCESS('Successfully added designations to the database.'))

import csv
from django.core.management.base import BaseCommand
from api.models import Designation

class Command(BaseCommand):
    help = "Imports designation data from a CSV file"

    def handle(self, *args, **kwargs):
        try:
            with open("C:/Users/gopiv/Downloads/services data/designations.csv", newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                designations = [
                    Designation(
                        name=row['Designation']
                    ) for row in reader
                ]
                # Clear the table if necessary
                Designation.objects.all().delete()
                
                # Bulk insert into the table
                Designation.objects.bulk_create(designations)
                self.stdout.write(self.style.SUCCESS("Successfully added designation data"))
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR("The file 'designation_data.csv' was not found."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {e}"))
