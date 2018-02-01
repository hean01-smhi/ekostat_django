from django.urls import path

from . import views

urlpatterns = [
	path('<workspace>', views.workspace_report),
	path('<workspace>/<subset>', views.subset_report)
]