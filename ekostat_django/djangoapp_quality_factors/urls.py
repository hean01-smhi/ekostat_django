
from django.conf.urls import url, include
# import cloudedbats_django.djangoapp_cloudedbats_species.views as species_views
import djangoapp_quality_factors.views as quality_factors_views


urlpatterns = [
    url(r'^', quality_factors_views.list_wurbs),
]

