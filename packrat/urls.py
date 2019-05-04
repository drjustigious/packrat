from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('packables/', views.packables, name='packables'),
    path('info/', views.info, name='info'),
    path('filter-loadouts/', views.filter_loadouts, name='filter-loadouts')
]

