from django.core.management.base import BaseCommand
from  api.models import Role

# Sample data for bulk insertion
roles = [
    {"role_name":"Admin"},
    {"role_name":"Student"},
    {"role_name":"Faculty"},
    {"role_name":"Employee"},
    {"role_name":"Alumni"},
    {"role_name":"ExEmployee"}
]


class Command(BaseCommand):
    help = 'Load bulk designations into the Designation table'

    def handle(self, *args, **options):
        # Clear the table if necessary
        Role.objects.all().delete()

        # Create designation instances from DESIGNATIONS
        designation_objects = [Role(role_name=role['role_name']) for role in roles]

        # Bulk insert the designations
        Role.objects.bulk_create(designation_objects)

        self.stdout.write(self.style.SUCCESS('Successfully added roles to the database.'))
