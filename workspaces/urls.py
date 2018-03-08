from django.urls import path

from . import views

urlpatterns = [
	path('', views.index),
	path('add', views.add),
	path('edit/<workspace_uuid>', views.edit),
	path('delete/<workspace_uuid>', views.delete)
]