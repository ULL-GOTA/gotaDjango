from django.urls import path
from . import views
#####
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
        path('', views.index),
	path("copernicus/", views.index),
	path("eumetsat/", views.index),
]
