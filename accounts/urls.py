from django.urls import path

from .views import AuthenticationView, ReauthenticationView

urlpatterns = [
    path('authenticate', AuthenticationView.as_view()),
    path('reauthenticate', ReauthenticationView.as_view()),
]
