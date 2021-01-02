from django.shortcuts import render
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from django.contrib.auth import authenticate, login
from . import models
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from random import random
from django.views.generic import TemplateView
from django.shortcuts import render,redirect
from user.models import CustomUser,Educator
from django.db.models import Q
# Create your views here.
from rest_framework.views import APIView
from datetime import datetime
from rest_framework import status
from django.http import JsonResponse
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from requests.exceptions import HTTPError

from social_django.utils import load_strategy, load_backend
from social_core.backends.oauth import BaseOAuth2
from social_core.exceptions import MissingBackend, AuthTokenError, AuthForbidden
from . import serializers
from rest_framework_jwt.settings import api_settings
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from rest_auth.registration.views import SocialLoginView
# from .adapters import GoogleOAuth2AdapterIdToken
from rest_framework.authtoken.models import Token



# class GoogleLogin(SocialLoginView):
#     adapter_class =  GoogleOAuth2AdapterIdToken
#
#     client_class = OAuth2Client
#     callback_url = 'http://localhost:8000/accounts/google/login/callback/'
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class SocialLoginView(generics.GenericAPIView):
    """Log in using facebook"""
    serializer_class = serializers.SocialSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """Authenticate user through the provider and access_token"""
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        provider = serializer.data.get('provider', None)
        print('provider',provider)
        strategy = load_strategy(request)
        print('strategy',strategy)

        try:
            print('kite')
            backend = load_backend(strategy=strategy, name=provider,
                                   redirect_uri=None)
            print('line50',backend)

        except MissingBackend:
            return Response({'error': 'Please provide a valid provider'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            if isinstance(backend, BaseOAuth2):
                access_token = serializer.data.get('access_token')
                print('line58')
            user = backend.do_auth(access_token)
        except HTTPError as error:
            print('line61')
            return Response({
                "error": {
                    "access_token": "Invalid token",
                    "details": str(error)
                }
            }, status=status.HTTP_400_BAD_REQUEST)
        except AuthTokenError as error:
            print('line69')
            return Response({
                "error": "Invalid credentials",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            print('line76')
            authenticated_user = backend.do_auth(access_token, user=user)
            print('authenticated_user',authenticated_user)

        except HTTPError as error:
            print('line80')
            return Response({
                "error": "invalid token",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)

        except AuthForbidden as error:
            print('line87')
            return Response({
                "error": "invalid token",
                "details": str(error)
            }, status=status.HTTP_400_BAD_REQUEST)

        print('authenticated_user.is_active',authenticated_user.is_active)
        authenticated_user.is_active = True
        print('authenticated_user.is_active',authenticated_user.is_active)
        if authenticated_user and authenticated_user.is_active:
            print('line94')
            # generate JWT token
            login(request, authenticated_user)
            data = {
                "token": jwt_encode_handler(
                    jwt_payload_handler(user)
                )}
            # customize the response to your needs
            response = {
                "email": authenticated_user.email,
                "username": authenticated_user.username,
                "token": data.get('token')
            }
            return Response(status=status.HTTP_200_OK, data=response)


class MobileVerificationViewset(generics.ListAPIView):
    serializer_class = serializers.PhoneVerificationSerializer
    permission_classes = [permissions.AllowAny]


    def get_queryset(self):
        code = self.request.query_params.get('verification_code', None)
        phone = self.request.query_params.get('phone', None)
        carerUser = CustomUser.objects.filter(Q(phone=phone)&Q(otp=code))
        print('carerUser',carerUser)
        if carerUser.exists():
            user = carerUser.first()
            user.is_active = True
            user.save()
        return carerUser

class Random(TemplateView):
        template_name = "random.html"
        print(random())

        def post(self, request):
            phone = request.POST.get('phone')
            print('phone', phone)
            email = request.POST.getlist('email')
            print('postemail', email)
            user = CustomUser(phone=phone)
            # user.set_password(password)
            user.save()
            return redirect('random')
            # return render(request, 'shopregister.html')

        def get(self, request):
            user = CustomUser.objects.all()
            print('getget', user)
            return render(request, 'random.html')


class CustomUserViewset(viewsets.ModelViewSet):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializers
    permission_classes = [permissions.AllowAny]


    def get(self):
        content = {'message': 'Hello, World!'}
        return Response(content)

class CustomUsersecondViewset(viewsets.ModelViewSet):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUsersecondSerializers
    permission_classes = [permissions.AllowAny]


class CustomUserthirdViewset(viewsets.ModelViewSet):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUserthirdSerializers
    permission_classes = [permissions.AllowAny]



class LastseenView(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request):
        id = self.request.query_params.get('id', None)
        print(id)
        user_exists= CustomUser.objects.filter(id=id)
        if user_exists.exists():
            user = user_exists.first()
            user.last_seen = datetime.now()
            user.save()
            content = {'user.last_seen':datetime.now()}
            return Response(content)
        content = {'message':'No user '}
        return Response(content,status=status.HTTP_226_IM_USED)

class CurrentUserView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        serializer = serializers.CustomUserSerializers(request.user)
        content = {'user': serializer.data}
        return Response(content)

class FacebookUserView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = self.request.query_params.get('email', None)
        print(email)
        users= CustomUser.objects.filter(email=email)
        if users.exists():
            user = users.first()
            authentication_token = Token.objects.get_or_create(user=user)[0]
            print('authentication_token',authentication_token)
            content = {'token':authentication_token.key,}
            return Response(content)
        content = {'message':'No user '}
        return Response(content,status=status.HTTP_226_IM_USED)


