from django.urls import path
from .views import (SocialLoginView)


urlpatterns = [path('oauth/', SocialLoginView.as_view())]