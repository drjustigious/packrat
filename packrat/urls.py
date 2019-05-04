from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('packables/', views.packables, name='packables'),
    path('info/', views.info, name='info'),

    path('new-packable/', views.new_packable, name='new-packable'),
    path('edit-packable/', views.edit_packable, name='edit-packable'),

    path('filter-loadouts/', views.filter_loadouts, name='filter-loadouts'),
    path('filter-packables/', views.filter_packables, name='filter-packables'),
]

