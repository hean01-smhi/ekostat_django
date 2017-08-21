
from django.conf.urls import url, include
# import cloudedbats_django.djangoapp_cloudedbats_species.views as species_views
import djangoapp_select.views as select_views


urlpatterns = [
    url(r'^', select_views.list_wurbs),
]

