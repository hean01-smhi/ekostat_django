from django.urls import path

from . import views

urlpatterns = [
	path('<workspace_uuid>', views.index),
	path('info/<subset_uuid>', views.info),
	path('add', views.add),
	path('edit/<subset_uuid>', views.edit),
	path('delete/<subset_uuid>', views.delete)
]