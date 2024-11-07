from django.core.management.base import BaseCommand
from  api.models import Service

# Sample data for bulk insertion
services = [
    {"service_name":"email_request"},
    {"service_name":"software_request"},
    {"service_name":"webmail_password_change"},
    {"service_name":"circular"},
    {"service_name":"academic_services"},
    {"service_name":"it_services"},
    {"service_name":"notifications"},
    {"service_name":"opd_form"},
    {"service_name":"guesthouse_booking"}    
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
