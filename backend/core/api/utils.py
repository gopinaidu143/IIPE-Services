from dateutil import parser
from django.template.loader import render_to_string,get_template
from .models import OPDFormData,Dependents,MasterData
from .serializers import DependentImaageSerializer
from django.templatetags.static import static
import pdfkit
import tempfile
import os
from django.template.loader import render_to_string
from django.contrib import messages
from django.templatetags.static import static
from .send_mails import opd_approved_email



def change_date(x):
    return parser.parse(x).date()





# def get_full_path_x(request):
#     full_path = ('http', ('', 's')[request.is_secure()], '://',
#     request.META['HTTP_HOST'], request.path)
#     return ''.join(full_path)


# def generate_pdf(request,record_id):
#     try:
#         record = OPDFormData.objects.get(referral_id=record_id)
#         record.approved_rejected_at = record.approved_rejected_at.date()
#         record.created_at = record.created_at.date()

#         template_path = "opd.html"

#         dependent_image = Dependents.objects.get(dependent_id=record.dependent_id)
#         dependent_img = DependentImaageSerializer(dependent_image).data
#         employee_type = MasterData.objects.filter(username=record.employee_name).values('employee_type').first()
#         logo_url = str(request.build_absolute_uri(static('images/logo.png')))
#         signature_url = str(request.build_absolute_uri(static('images/signature_reg.png')))
#         print(logo_url)
#         print(signature_url)
#         context =  {
#             'opd_form': record,
#             'logo_url': logo_url,
#             'signature_url': signature_url,
#             'dependent_img': dependent_img['id_proof_base64'] if dependent_img else None,
#             'employee_type': employee_type['employee_type'] if employee_type else 'Unknown'
#         }
#         context = Context(context)

#         template = get_template(template_path)
#         html = template.render(context)
#         result = StringIO.StringIO()
#         pdf = pisa.pisaDocument(StringIO.StringIO(html.encode("UTF-8")),result, path=path)



#         pdf_buffer = BytesIO()
#         pisa_status = pisa.CreatePDF(html, dest=pdf_buffer)

#         if not pisa_status.err:
#             record.opd_form = pdf_buffer.getvalue() 
#             record.save(update_fields=["opd_form"])
#         print('successfully pdf generated')
#     except Exception as e:
#         print('error in pdf generation',e)
#         pass



# from django.template.loader import get_template
# from django.templatetags.static import static
# from django.http import HttpResponse
# from io import BytesIO
# import xhtml2pdf.pisa as pisa

# def generate_pdf(request, record_id):
#     try:
#         record = OPDFormData.objects.get(referral_id=record_id)
#         record.approved_rejected_at = record.approved_rejected_at.date()
#         record.created_at = record.created_at.date()

#         template_path = "opd.html"

#         # Fetching dependent image and other data
#         dependent_image = Dependents.objects.get(dependent_id=record.dependent_id)
#         dependent_img = DependentImaageSerializer(dependent_image).data
#         employee_type = MasterData.objects.filter(username=record.employee_name).values('employee_type').first()
        
#         # URLs for static images
#         logo_url = request.build_absolute_uri(static('images/logo.png'))
#         signature_url = request.build_absolute_uri(static('images/signature_reg.png'))
        
#         # Template and context
#         template = get_template(template_path)
#         context_dict = {
#             'opd_form': record,
#             'logo_url': logo_url,
#             'signature_url': signature_url,
#             'dependent_img': dependent_img['id_proof_base64'] if dependent_img else None,
#             'employee_type': employee_type['employee_type'] if employee_type else 'Unknown'
#         }

#         html = template.render(context_dict)

#         # Create a PDF file in memory
#         pdf_buffer = BytesIO()
#         pisa_status = pisa.CreatePDF(BytesIO(html.encode("UTF-8")), dest=pdf_buffer)
        
#         if pisa_status.err:
#             print('Error in PDF generation')
#             return None

#         # Save generated PDF to the record
#         record.opd_form = pdf_buffer.getvalue() 
#         record.save(update_fields=["opd_form"])
#         print('PDF successfully generated')

#     except Exception as e:
#         print('Error in PDF generation:', e)

         






# def generate_pdf(request,record_id):
#     try:
#         record = OPDFormData.objects.get(referral_id=record_id)
#         record.approved_rejected_at = record.approved_rejected_at.date()
#         record.created_at = record.created_at.date()

#         template_path = "opd.html"

#         dependent_image = Dependents.objects.get(dependent_id=record.dependent_id)
#         dependent_img = DependentImaageSerializer(dependent_image).data
#         employee_type = MasterData.objects.filter(username=record.employee_name).values('employee_type').first()
#         logo_url = request.build_absolute_uri(static('images/logo.png'))
#         signature_url = request.build_absolute_uri(static('images/signature_reg.png'))
#         print(logo_url)
#         print(signature_url)
#         html = render_to_string(template_path, {
#             'opd_form': record,
#             'logo_url': logo_url,
#             'signature_url': signature_url,
#             'dependent_img': dependent_img['id_proof_base64'] if dependent_img else None,
#             'employee_type': employee_type['employee_type'] if employee_type else 'Unknown'
#         })

#         pdf_buffer = BytesIO()
#         pisa_status = pisa.CreatePDF(html, dest=pdf_buffer)

#         if not pisa_status.err:
#             record.opd_form = pdf_buffer.getvalue() 
#             record.save(update_fields=["opd_form"])
#         print('successfully pdf generated')
#     except Exception as e:
#         print('error in pdf generation',e)
#         pass
         





# def generate_pdf(request, record_id):
#     try:
#         # Fetch the record based on the provided referral_id (record_id)
#         record = OPDFormData.objects.get(referral_id=record_id)
#         record.approved_rejected_at = record.approved_rejected_at.date()
#         record.created_at = record.created_at.date()

#         template_path = "opd.html"
#         dependent_image = Dependents.objects.get(dependent_id=record.dependent_id)
#         dependent_img = DependentImaageSerializer(dependent_image).data
#         employee_type = MasterData.objects.filter(username=record.employee_name).values('employee_type').first()

#         # Prepare URLs for images
#         logo_url = request.build_absolute_uri(static('images/logo.png'))
#         signature_url = request.build_absolute_uri(static('images/signature_reg.png'))

#         # Context for the template
#         context_dict = {
#             'opd_form': record,
#             'logo_url': logo_url,
#             'signature_url': signature_url,
#             'dependent_img': dependent_img['id_proof_base64'] if dependent_img else None,
#             'employee_type': employee_type['employee_type'] if employee_type else 'Unknown'
#         }

#         # Configure pdfkit
#         path_to_wkhtmltopdf = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'  # Update this if needed for Windows
#         config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)

#         # Render HTML from the template
#         html = render_to_string(template_path, context_dict)

#         # Define the options for PDF generation
#         options = {
#             'page-size': 'A4',
#             'margin-top': '7mm',  # Remove top margin
#             'margin-right': '0mm',  # Remove right margin
#             'margin-bottom': '0mm',  # Remove bottom margin
#             'margin-left': '0mm',  # Remove left margin
#             'no-outline': None,  # To avoid outline (hyperlink) issues
#             'disable-smart-shrinking': None,  # Prevent shrinking to fit page
#             'load-error-handling': 'ignore',  # Ignore errors during rendering
#             'enable-javascript':True,
#             'zoom':0.95
#         }

#         # Generate the PDF and save it to a temporary file
#         pdf_file_path = tempfile.mktemp(suffix='.pdf')
#         pdfkit.from_string(html, pdf_file_path, configuration=config, options=options)

#         # Construct filename
#         filename = f"{record.referral_id}-opd-form.pdf"

#         # Prepare the response to serve the PDF for download
#         with open(pdf_file_path, 'rb') as pdf_file:
#             response = HttpResponse(pdf_file.read(), content_type='application/pdf')
#             response['Content-Disposition'] = f'attachment; filename="{filename}"'

#         # Remove the temporary PDF file
#         os.remove(pdf_file_path)

#         print("PDF generated and sent as response.")
#         return response

#     except OPDFormData.DoesNotExist:
#         # Handle the case where the record does not exist
#         messages.error(request, "Record not found")
#         return redirect(reverse('some_view_name'))  # Replace 'some_view_name' with your view name

#     except Exception as e:
#         print("Error in PDF generation:", e)
#         messages.error(request, "An error occurred while generating the PDF")
#         return redirect(reverse('some_view_name'))  # Replace with your relevant view name


import tempfile
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.contrib import messages
import pdfkit

def generate_pdf(request, record_id):
    try:
        # Fetch the record based on the provided referral_id (record_id)
        record = OPDFormData.objects.get(referral_id=record_id)
        record.approved_rejected_at = record.approved_rejected_at.date()
        record.created_at = record.created_at.date()

        template_path = "opd.html"
        dependent_image = Dependents.objects.get(dependent_id=record.dependent_id)
        dependent_img = DependentImaageSerializer(dependent_image).data
        employee_type = MasterData.objects.filter(username=record.employee_name).values('employee_type').first()

        # Prepare URLs for images
        logo_url = request.build_absolute_uri(static('images/logo.png'))
        signature_url = request.build_absolute_uri(static('images/signature_reg.png'))

        # Context for the template
        context_dict = {
            'opd_form': record,
            'logo_url': logo_url,
            'signature_url': signature_url,
            'dependent_img': dependent_img['id_proof_base64'] if dependent_img else None,
            'employee_type': employee_type['employee_type'] if employee_type else 'Unknown'
        }

        # Configure pdfkit
        path_to_wkhtmltopdf = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'  # Update this if needed for Windows
        config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)

        # Render HTML from the template
        html = render_to_string(template_path, context_dict)

        # Define the options for PDF generation
        options = {
            'page-size': 'A4',
            'margin-top': '7mm',
            'margin-right': '0mm',
            'margin-bottom': '0mm',
            'margin-left': '0mm',
            'no-outline': None,
            'disable-smart-shrinking': None,
            'load-error-handling': 'ignore',
            'enable-javascript': True,
            'zoom': 0.95
        }

        # Generate the PDF and save it to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
            pdfkit.from_string(html, temp_pdf.name, configuration=config, options=options)

            # Read the PDF data from the temporary file
            with open(temp_pdf.name, 'rb') as f:
                pdf_data = f.read()

        # Save the PDF binary data to the database
        record.opd_form = pdf_data  # Assuming opd_form is a BinaryField in your model
        record.save(update_fields=["opd_form"])

        print("PDF generated and saved to database.")
        messages.success(request, "PDF generated and saved successfully.")
        opd_approved_email(record.employee.email, temp_pdf.name, record_id)

        # Delete the temporary file after sending email
        os.remove(temp_pdf.name)

    except OPDFormData.DoesNotExist:
        messages.error(request, "Record not found.")
        print('Error: OPDFormData does not exist for the given record_id.')
    except Exception as e:
        print("Error in PDF generation:", e)
        messages.error(request, "An error occurred while generating the PDF.")