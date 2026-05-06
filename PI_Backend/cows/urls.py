from django.urls import path
from .views import CowListCreateView

urlpatterns = [
    path('cows/', CowListCreateView.as_view(), name='cows'),
    path('cows/<int:pk>/', CowListCreateView.as_view(), name='cow-detail'),
] 