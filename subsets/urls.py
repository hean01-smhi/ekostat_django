from django.urls import path

from . import views

urlpatterns = [
	path('<workspace_uuid>', views.index),
	path('<workspace>/edit', views.edit)
]