from django.urls import path, include
from . import views

urlpatterns = [
    path(r'home', views.index, name="home")
]