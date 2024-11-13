import csv
from django.core.management.base import BaseCommand
from  api.models import Hospital

class Command(BaseCommand):
    help = "Imports hospital data from a CSV file"

    def handle(self, *args, **kwargs):
        with open("C:\\Users\\gopiv\\Downloads\\hospital_data.csv", newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            hospitals = [
                Hospital(
                    hospital_name=row['Name Of the Hospital'],
                    contact_details=row['Contact Details'],
                    remarks=row['Remarks']
                ) for row in reader
            ]
            Hospital.objects.bulk_create(hospitals)
            self.stdout.write(self.style.SUCCESS("Successfully added hospital data"))
