"""videosession URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from .router import router
from django.urls import path,include
from customuser import views as customuser_views
from rest_framework_simplejwt import views as jwt_views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views

urlpatterns = [
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/oauth/', include('rest_framework_social_oauth2.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('random/',customuser_views.Random.as_view(),name='random'),
    path('otp/',customuser_views.MobileVerificationViewset.as_view(),name='otp'),
    path('lastseen/', customuser_views.LastseenView.as_view(), name='device'),
    path('currentuser/', customuser_views.CurrentUserView.as_view(), name='currentuser'),
    path('facebook', customuser_views.SocialLoginView.as_view()),
    # path('auth/google', customuser_views.GoogleLogin.as_view(), name='google_login'),
    path('facebookuser/', customuser_views.FacebookUserView.as_view(), name='facebookuser'),
    path('api-token-auth/', views.obtain_auth_token)

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)