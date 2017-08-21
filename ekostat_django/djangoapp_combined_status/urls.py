
from django.conf.urls import url, include
# import cloudedbats_django.djangoapp_cloudedbats_species.views as species_views
import djangoapp_combined_status.views as combined_status_views


urlpatterns = [
    url(r'^', combined_status_views.list_wurbs),
]

