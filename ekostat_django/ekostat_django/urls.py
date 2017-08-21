
from django.conf.urls import url, include
import djangoapp_base.views as base_views

urlpatterns = [
    url(r'^introduction/$', base_views.view_introduction),
    url(r'^introduction$', base_views.view_introduction),
    url(r'^documentation/$', base_views.view_documentation),
    url(r'^documentation$', base_views.view_documentation),
    url(r'^about/$', base_views.view_about),
    url(r'^about$', base_views.view_about),
    #
    url(r'^select/', include('djangoapp_select.urls')),
    url(r'^select', include('djangoapp_select.urls')),
    url(r'^data/', include('djangoapp_data.urls')),
    url(r'^data', include('djangoapp_data.urls')),
    url(r'^quality_factors/', include('djangoapp_quality_factors.urls')),
    url(r'^quality_factors', include('djangoapp_quality_factors.urls')),
    url(r'^combined_status/', include('djangoapp_combined_status.urls')),
    url(r'^combined_status', include('djangoapp_combined_status.urls')),
    url(r'^download/', include('djangoapp_download.urls')),
    url(r'^download', include('djangoapp_download.urls')),
    #
    url(r'^$', base_views.view_introduction),
    url(r'^', base_views.view_work_in_progress),
    
]

# """ekostat_django URL Configuration
# 
# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/1.11/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.conf.urls import url, include
#     2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
# """
# from django.conf.urls import url
# from django.contrib import admin
# 
# urlpatterns = [
#     url(r'^admin/', admin.site.urls),
# ]
