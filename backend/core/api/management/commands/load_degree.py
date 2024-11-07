from django.core.management.base import BaseCommand
from  api.models import Degree

# Sample data for bulk insertion
roles = [
    {"name":"B.Tech"},
    {"name":"M.Tech"},
    {"name":"M.sc"}
    
]


class Command(BaseCommand):
    help = 'Load bulk degree into the degree table'

    def handle(self, *args, **options):
        # Clear the table if necessary
        Degree.objects.all().delete()

        # Create designation instances from DESIGNATIONS
        degree_objects = [Degree(name=degree['name']) for degree in roles]

        # Bulk insert the designations
        Degree.objects.bulk_create(degree_objects)

        self.stdout.write(self.style.SUCCESS('Successfully added degree to the database.'))
