# urls.py
from django.urls import path
from .views import RegisterAPIView,LoginAPIView,LogoutView,CustomTokenRefreshView,ForgotPasswordView,VerifyOTPView,ResetPasswordView,FormOptionsView,ServiceListView

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


]
