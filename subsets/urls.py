from django.urls import path

from . import views

urlpatterns = [
	path('<workspace>', views.index),
	path('<workspace>/edit', views.edit)
]