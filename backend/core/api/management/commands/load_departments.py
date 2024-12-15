# from django.core.management.base import BaseCommand
# from api.models import Department  # Ensure this matches your app's model import path

# DEPARTMENTS = [
#     {"name": "ACA CEN-CENTRE OF NANOTECHNOLOGY", "department_code": "ACN"},
#     {"name": "ACADEMIC SECTION", "department_code": "AS"},
#     {"name": "ADMINISTRATION", "department_code": "ADM"},
#     {"name": "ARCHITECTURE AND PLANNING", "department_code": "AP"},
#     {"name": "CENTRAL LIBRARY", "department_code": "CL"},
#     {"name": "ASSOCIATE DEAN INTERNATIONAL RELATION", "department_code": "ADIR"},
#     {"name": "AUDIT & ACCOUNTS", "department_code": "AA"},
#     {"name": "BIOTECHNOLOGY", "department_code": "BT"},
#     {"name": "CAREER DEVELOPMENT CELL (CDC)", "department_code": "CDC"},
#     {"name": "CENTRAL STORES_SRE", "department_code": "CSS"},
#     {"name": "CENTRE FOR INDIAN KNOWLEDGE SYSTEMS", "department_code": "CIK"},
#     {"name": "CENTRE FOR TRANSPORTATION SYSTEMS (CTRANS)", "department_code": "CTR"},
#     {"name": "CENTRE OF NANOTECHNOLOGY", "department_code": "CNT"},
#     {"name": "CHEMICAL ENGINEERING", "department_code": "CHE"},
#     {"name": "CHEMISTRY", "department_code": "CHM"},
#     {"name": "CIVIL ENGINEERING", "department_code": "CIV"},
#     {"name": "COE - CENTRE FOR TRANSPORTATION SYSTEMS", "department_code": "CTS"},
#     {"name": "COE - DISASTER MITIGATION", "department_code": "DM"},
#     {"name": "CONTINUING EDUCATION CENTRE (CEC)", "department_code": "CEC"},
#     {"name": "DD OFFICE", "department_code": "DDO"},
#     {"name": "DEAN ACADEMICS OFFICE", "department_code": "DAO"},
#     {"name": "DEAN OF STUDENTS WELFARE", "department_code": "DSW"},
#     {"name": "DEAN OF STUDENTS WELFARE OFFICE", "department_code": "DSWO"},
#     {"name": "DEAN RESOURCES AND ALUMNI AFFAIRS OFFICE", "department_code": "DRAO"},
#     {"name": "DEAN SRIC OFFICE", "department_code": "DSO"},
#     {"name": "DEPARTMENT OF HYDRO AND RENEWABLE ENERGY", "department_code": "DHRE"},
#     {"name": "DEPT. OF APPLIED MATH AND SCI COMPUTING", "department_code": "AMSC"},
#     {"name": "DEPT. OF APPLIED SCIENCE AND ENGINEERING", "department_code": "ASE"},
#     {"name": "DEPT. OF BIOSCIENCES", "department_code": "BIO"},
#     {"name": "DEPT. OF EARTH SCIENCES", "department_code": "ES"},
#     {"name": "DEPT. OF EARTHQUAKE ENGINEERING", "department_code": "EQE"},
#     {"name": "DEPT. OF HUMANITIES", "department_code": "HUM"},
#     {"name": "DEPT. OF HYDROLOGY", "department_code": "HYD"},
#     {"name": "DEPT. OF MANAGEMENT STUDIES", "department_code": "MNG"},
#     {"name": "DEPT. OF MECH.", "department_code": "MECH"},
#     {"name": "DEPT. OF METALLURGICAL", "department_code": "MET"},
#     {"name": "DEPT. OF PAPER TECHNOLOGY", "department_code": "PT"},
#     {"name": "DEPT. OF PHYSICS", "department_code": "PHY"},
#     {"name": "DEPT. OF POLYMER AND PROCESS ENGINEERING", "department_code": "PPE"},
#     {"name": "DEPUTY REGISTRAR ADMIN OFFICE", "department_code": "DRA"},
#     {"name": "DESIGN INNOVATION CENTER", "department_code": "DIC"},
#     {"name": "DIRECTOR OFFICE", "department_code": "DO"},
#     {"name": "DOFA", "department_code": "DOFA"},
#     {"name": "DORA OFFICE", "department_code": "DORA"},
#     {"name": "EDUCATIONAL TECHNOLOGY CELL", "department_code": "ETC"},
#     {"name": "E-LEARNING CENTRE", "department_code": "ELC"},
#     # Add more entries as needed...
# ]


# class Command(BaseCommand):
#     help = "Load departments into the database"

#     def handle(self, *args, **options):
#         for dept in DEPARTMENTS:
#             Department.objects.update_or_create(name=dept["name"], defaults={"department_code": dept["department_code"]})
#         self.stdout.write(self.style.SUCCESS("Departments loaded successfully"))


import csv
from django.core.management.base import BaseCommand
from api.models import Department  # Ensure Department model exists in api.models

class Command(BaseCommand):
    help = "Imports department data from a CSV file"

    def handle(self, *args, **kwargs):
        try:
            # File path to the CSV file
            file_path = "C:/Users/gopiv/Downloads/services data/departments.csv"
            with open(file_path, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)

                # Prepare departments list for bulk insertion
                departments = [
                    Department(
                        name=row['Department'],
                        department_code=row['department_code']
                    ) for row in reader
                ]

                # Clear the table (optional)
                Department.objects.all().delete()

                # Bulk insert into the table
                Department.objects.bulk_create(departments)
                self.stdout.write(self.style.SUCCESS("Successfully added department data"))

        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"The file '{file_path}' was not found."))
        except KeyError as e:
            self.stdout.write(self.style.ERROR(f"Missing column in CSV file: {e}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {e}"))

