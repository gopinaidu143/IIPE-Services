# urls.py
from django.urls import path
from .views import (RegisterAPIView,LoginAPIView,LogoutView,CustomTokenRefreshView,
                    ForgotPasswordView,VerifyOTPView,ResetPasswordView,FormOptionsView,
                    ServiceListView,EmployeeDataView,DependentDataView,OPDSubmissionView,
                    UserOPDListView,AdminOPDListView,ApproveRecord,RejectRecord,AddCircularView,DepartmentOptionsView,
                    AddEventView,AddMemoView,EmailRequisitionView,SoftwareRequisitionView)
from .utils import generate_pdf

urlpatterns = [
    path('register/', RegisterAPIView.as_view()),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('form-options/', FormOptionsView.as_view(), name='form_options'),
    path('services/', ServiceListView.as_view(), name='services_list'),
    path('employee-data/<str:email_id>/', EmployeeDataView.as_view(), name='employee-data'),
    path('dependent-data/<str:dependent_id>/', DependentDataView.as_view(), name='dependent-data'),
    path('submit-opd/', OPDSubmissionView.as_view(), name='opd_data'),
    path('user-opdforms/<str:id>', UserOPDListView.as_view(), name='user_opdform'),
    path('admin-opdforms/', AdminOPDListView.as_view(), name='admin_opdform'),
    path('admin-opdforms/<str:record_id>/approve/',ApproveRecord.as_view() , name='approve_record'),
    path('admin-opdforms/<str:record_id>/reject/',  RejectRecord.as_view(), name='reject_record'),
    # path('opd/',opd,name='opd'),
    # path('preview-pdf/<str:doc_id>/', preview_pdf, name='preview_pdf'),
    path('generate-pdf/<str:record_id>/', generate_pdf, name='preview_pdf'),
    path('circulars/add/', AddCircularView.as_view(), name='circular-add'),
    path('departments/', DepartmentOptionsView.as_view(), name='departments-data'),
    path('event/add/', AddEventView.as_view(), name='event-add'),
    path('memo/add/', AddMemoView.as_view(), name='memo-add'),
    path('email-requisition/', EmailRequisitionView.as_view(), name='email-requisition'),
    path('software-requisition/', SoftwareRequisitionView.as_view(), name='software-requisition'),






]
