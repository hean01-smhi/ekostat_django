
from django.conf.urls import url, include
# import cloudedbats_django.djangoapp_cloudedbats_species.views as species_views
import djangoapp_download.views as download_views


urlpatterns = [
    url(r'^', download_views.list_wurbs),
]

