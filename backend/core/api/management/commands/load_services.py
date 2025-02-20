from django.core.management.base import BaseCommand
from  api.models import Service

# Sample data for bulk insertion
# services = [
#     {"service_name":"Email Requisition"},
#     {"service_name":"Software Requisition"},
#     {"service_name":"Webmail Password Change"},
#     {"service_name":"Circulars"},
#     {"service_name":"Academic Services"},
#     {"service_name":"IT Services"},
#     {"service_name":"Notifications"},
#     {"service_name":"OPD Form"},
#     {"service_name":"Guesthouse Booking"},
#     {"service_name":"Office Memorandums"},
#     {"service_name":"Events"}    
# ]

services = [
    {"service_name":"Email Requisition"},
    {"service_name":"Email Requisition Request"},
    {"service_name":"Software Requisition"},
    {"service_name":"Software Requisition Request"},
    {"service_name":"Webmail Password Change"},
    {"service_name":"Circulars"},
    {"service_name":"Circular/ Notification/ Orders"},
    {"service_name":"Academic Services"},
    {"service_name":"IT Services"},
    {"service_name":"Notifications"},
    {"service_name":"OPD Service"},
    {"service_name":"OPD Request"},
    {"service_name":"Guesthouse Booking"},
    {"service_name":"Office Memorandums"},
    {"service_name":"Office Memos"},
    {"service_name":"Office Orders"},
    {"service_name":"Publish Events"},
    {"service_name":"Events"}  
]


class Command(BaseCommand):
    help = 'Load bulk degree into the degree table'

    def handle(self, *args, **options):
        # Clear the table if necessary
        Service.objects.all().delete()

        # Create designation instances from DESIGNATIONS
        degree_objects = [Service(service_name=service['service_name']) for service in services]

        # Bulk insert the designations
        Service.objects.bulk_create(degree_objects)

        self.stdout.write(self.style.SUCCESS('Successfully added services to the database.'))
