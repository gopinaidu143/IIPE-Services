# urls.py
from django.urls import path
from .views import (RegisterAPIView,LoginAPIView,LogoutView,CustomTokenRefreshView,
                    ForgotPasswordView,VerifyOTPView,ResetPasswordView,FormOptionsView,
                    ServiceListView,EmployeeDataView,DependentDataView,OPDSubmissionView,
                    UserOPDListView,AdminOPDListView,ApproveRecord,RejectRecord,AddCircularView,DepartmentOptionsView,
                    AddEventView,AddMemoView,EmailRequisitionView,SoftwareRequisitionView,CircularListView
                    ,PublishCircularView,UnpublishCircularView,preview_pdf,preview_circular_pdf,EventListView,PublishEventView,
                    UnpublishEventView,preview_event_pdf,MemoListView,preview_memo_pdf,PublishMemoView,UnpublishMemoView,
                    EmailRequisitionListView,ResolveEmailRequisition,EmailRequisitionResponse,SoftwareRequisitionResponse,
                    ResolveSoftwareRequisition,SoftwareRequisitionListView,TopCircularsView,TopEventsView,AllCircularsView,AllEventsView)
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
    path('preview-pdf/<str:doc_id>/', preview_pdf, name='preview_pdf'),
    path('generate-pdf/<str:record_id>/', generate_pdf, name='preview_pdf'),
    path('departments/', DepartmentOptionsView.as_view(), name='departments-data'),
    path('circulars/add/', AddCircularView.as_view(), name='circular-add'),
    path('circulars/<int:pk>/add/', AddCircularView.as_view(), name='circular-update'),  # For update
    path("circulars-list/", CircularListView.as_view(), name="circular-list"),
    path("circulars/<int:pk>/publish/", PublishCircularView.as_view(), name="publish-circular"),
    path("circulars/<int:pk>/unpublish/", UnpublishCircularView.as_view(), name="unpublish-circular"),
    # path('circulars/<int:pk>/', AddCircularView.as_view(), name='circular_detail'),
    path('circulars/<int:pk>/download/',preview_circular_pdf, name='preview_circular_pdf'),
    path('events/add/', AddEventView.as_view(), name='event-add'),
    path('events/<int:pk>/add/', AddEventView.as_view(), name='event-update'),  # For update
    path("events-list/", EventListView.as_view(), name="event-list"),
    path("events/<int:pk>/publish/", PublishEventView.as_view(), name="publish-event"),
    path("events/<int:pk>/unpublish/", UnpublishEventView.as_view(), name="unpublish-event"),
    path('events/<int:pk>/download/',preview_event_pdf, name='preview_event_pdf'),
    path('memos/add/', AddMemoView.as_view(), name='memo-add'),
    path('memos/<int:pk>/add/', AddMemoView.as_view(), name='memo-update'),  # For update
    path("memos-list/", MemoListView.as_view(), name="memo-list"),
    path("memos/<int:pk>/publish/", PublishMemoView.as_view(), name="publish-memo"),
    path("memos/<int:pk>/unpublish/", UnpublishMemoView.as_view(), name="unpublish-memo"),
    path('memos/<int:pk>/download/',preview_memo_pdf, name='preview_memo_pdf'),
    path('email-requisition/', EmailRequisitionView.as_view(), name='email-requisition'),
    path('email-requisition-list/', EmailRequisitionListView.as_view(), name='email-requisition-list'),
    path("email-requisition/<int:pk>/resolve/", ResolveEmailRequisition.as_view(), name="resolve-email-requisition"),
    path("email-requisition/<int:pk>/response/", EmailRequisitionResponse.as_view(), name="response-email-requisition"),
    path('software-requisition/', SoftwareRequisitionView.as_view(), name='software-requisition'),
    path('software-requisition-list/', SoftwareRequisitionListView.as_view(), name='email-requisition-list'),
    path("software-requisition/<int:pk>/resolve/", ResolveSoftwareRequisition.as_view(), name="resolve-email-requisition"),
    path("software-requisition/<int:pk>/response/", SoftwareRequisitionResponse.as_view(), name="response-email-requisition"),
    path('circulars/top-view/', TopCircularsView.as_view(), name='top-circulars'),
    path('events/top-view/', TopEventsView.as_view(), name='top-events'),
    path('circulars/all-view/', AllCircularsView.as_view(), name='all-circulars'),
    path('events/all-view/', AllEventsView.as_view(), name='all-events'),












]
