from django.urls import path

from . import views

urlpatterns = [
	path('add', views.add),
	path('info/<subset_uuid>', views.info),
	path('edit/<subset_uuid>', views.edit),
	path('delete/<subset_uuid>', views.delete),
	path('<workspace_uuid>', views.index)
]