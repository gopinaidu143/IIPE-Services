from django.core.management.base import BaseCommand
from  api.models import UserAccount,Role,Student




class Command(BaseCommand):
    help = 'Load bulk student into the student table'

    def handle(self, *args, **options):
        # Clear the table if necessary
        
        user_role = Role.objects.get(role_name="Admin")
        # Create designation instances from DESIGNATIONS
        UserAccount.objects.create_superuser(email='tempmail@gmail.com',password="TempPass123",username="Admin User",first_name="Admin",last_name="IIPE",role=user_role)

        # Bulk insert the designations
        

        self.stdout.write(self.style.SUCCESS('Successfully added superuser to the database.'))
