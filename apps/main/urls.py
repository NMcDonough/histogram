from django.urls import path, include
from . import views

urlpatterns = [
    path(r'', views.index, name="home"),
    path(r'histogram', views.histogram, name="histogram")
]