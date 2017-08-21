
from django.conf.urls import url, include
# import cloudedbats_django.djangoapp_cloudedbats_species.views as species_views
import djangoapp_data.views as data_views


urlpatterns = [
    url(r'^', data_views.list_wurbs),
]

