from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('filter-loadouts/', views.filter_loadouts, name='filter-loadouts')
]

