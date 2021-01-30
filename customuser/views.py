from django.shortcuts import render
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
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
import json
from rest_framework_jwt.settings import api_settings
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
# from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# from rest_auth.registration.views import SocialLoginView
# from .adapters import GoogleOAuth2AdapterIdToken
from rest_framework.authtoken.models import Token
from django.shortcuts import render
from django.template.loader import render_to_string
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import math, random
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_jwt.settings import api_settings
from django.http import JsonResponse
from django.views.generic import TemplateView
from django_filters.rest_framework import DjangoFilterBackend


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

# class GoogleLogin(SocialLoginView):
#     adapter_class =  GoogleOAuth2AdapterIdToken
#
#     client_class = OAuth2Client
#     callback_url = 'http://localhost:8000/accounts/google/login/callback/'
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

def Moosend(email):
    params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json"}
    payload = {
        "Name": "New updated List"
    }
    resp = requests.post(
        'https://api.moosend.com/v3/lists/create.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&Format=json',
        json=payload,
        headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
    print (resp.text)
    if resp.status_code != 201:
        success_dict = json.loads(resp.text)
        mail_id = success_dict['Context']
        print('createmaillistsuccess')
        # to create subscriber
        params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json",
                  "MailingListID": mail_id}
        payload = {
            "Email": email
        }
        resp = requests.post(
            'https://api.moosend.com/v3/subscribers/'+ mail_id +'/subscribe.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&MailingListID='+ mail_id +'&Format=json',
            json=payload,
            headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
        print (resp.text)
        if resp.status_code != 201:
            print('success subscriber')
            # to create campaign
            params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json"}
            payload = {
                "Name": "test4",
                "Subject": "Some subject",
                "SenderEmail": "sales@kodecrux.com",
                "ReplyToEmail": "sales@kodecrux.com",
                "ConfirmationToEmail": "sales@kodecrux.com",
                "WebLocation": "http://13.229.251.62:8000/password-email-verification/?email="+ email ,
                "MailingLists": [
                    {
                        "MailingListID": mail_id
                    }
                ]

            }
            resp = requests.post(
                'https://api.moosend.com/v3/campaigns/create.json?apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980',
                json=payload,
                headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
            print ('campaign created', resp.text)
            if resp.status_code != 201:
                success_dict = json.loads(resp.text)
                campaign_id = success_dict['Context']
                print('Created task. ID: {}')
                # to sending a campaign
                params = {"apikey": "7708db34-9af3-4b1d-9cca-eae97e8dd980", "format": "json",
                          "CampaignID": campaign_id}
                resp = requests.post(
                    'https://api.moosend.com/v3/campaigns/'+ campaign_id +'/send.json?Format=json&apikey=7708db34-9af3-4b1d-9cca-eae97e8dd980&CampaignID='+campaign_id+'',
                    headers={'Content-Type': 'application/json', 'Accept': 'application/json'}, )
                print (resp.text)
                if resp.status_code != 201:
                    print('sendingsuccess')
                    return True
                else:
                    return False

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
            print('MissingBackend',MissingBackend)
            return Response({'error': 'Please provide a valid provider'},
                            status=status.HTTP_400_BAD_REQUEST)
            print('Response',Response)
        try:
            print('tryinstance')
            if isinstance(backend, BaseOAuth2):
                access_token = serializer.data.get('access_token')
                print('line58')
            user = backend.do_auth(access_token)
            print('user',user.email)

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


        # try:
        #     print('try114')
        #     user = CustomUser.objects.get(email=user.email)
        # except CustomUser.DoesNotExist:
        #     user = CustomUser()
        #     user.username = user.email
        #     print('user.username',user.username)
        #     # provider random default password
        #     user.password = make_password(BaseUserManager().make_random_password())
        #     user.email = user.email
        #     user.is_active= True
        #     print('user.is_active',user.is_active)
        #     user.save()
        #
        # token = RefreshToken.for_user(user)  # generate token without username & password
        # response = {}
        # response['username'] = user.username
        # response['access_token'] = str(token.access_token)
        # response['refresh_token'] = str(token)
        # return Response(response)

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
        authenticated_user.save()
        if authenticated_user and authenticated_user.is_active:
            print('line94')
            # generate JWT token
            login(request, authenticated_user)
            # data = {
            #     "token": jwt_encode_handler(
            #         jwt_payload_handler(user)
            #     )}
            token = RefreshToken.for_user(user)
            # customize the response to your needs
            response = {
                "email": authenticated_user.email,
                "username": authenticated_user.username,
            }

            response['access_token'] = str(token.access_token)
            response['refresh_token'] = str(token)
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
    # print('CustomUser',CustomUser.objects.filter(id=CustomUser.objects.last().id).values())

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

class OTP(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        otp = request.user.otp
        return Response(otp,status=status.HTTP_226_IM_USED)

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


class ForgotPasswordViewset(viewsets.ModelViewSet):
    print ('uytfghj')
    queryset = CustomUser.objects.all()
    print(queryset)
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.ForgotPasswordSerializers
    lookup_field = 'verification_code'
    lookup_url_kwarg = 'verification_code'
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['email']

    def update(self, request, *args, **kwargs):
        print('pk', kwargs.get('verification_code'))
        print('self',self.kwargs['verification_code'])
        instance = self.queryset.get(verification_code=kwargs.get('verification_code'))
        instance.set_password(request.data['password'])
        instance.save()
        print('password', request.data['password'], instance)
        return Response(instance.email)


# def ForgotPasswordVerification(code, email):
#     message = Mail(
#         from_email='sales@codekrux.com',
#         to_emails=email,
#         subject='Reset Password',
#         html_content='<strong>'+ str(code) + '</strong>'
#     )
#     print('settings.SENDGRID_API_KEY',settings.SENDGRID_API_KEY)
#     sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
#     response = sg.send(message)
#     print(response.status_code)
#     print(response.body)
#     print(response.headers)



class ForgotPasswordEmailVerificationViewSet(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self,request):
        email = self.request.query_params.get('email', None)
        code = self.request.query_params.get('code',None)
        print('email', email)
        user = models.CustomUser.objects.filter(email=str(email),verification_code=str(code))
        if user.exists():
            success = Moosend(email)
            # ForgotPasswordVerification(code, is_user.email)
            # content = {'code':code}
        context = {'code':code}
        return render(self.request, 'random.html', context)

class ForgotPasswordEmailSecondVerificationViewSet(generics.ListAPIView):
    serializer_class = serializers.ForgotPasswordEmailVerificationSerializers
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        email = self.request.query_params.get('email', None)
        print('email', email)
        user = models.CustomUser.objects.filter(email=str(email))
        if user.exists():
            is_user = user.first()
            code = random.randint(100000, 999999)
            print('instance', is_user.verification_code, code)
            is_user.verification_code = code
            is_user.save()
            r = requests.get('http://0.0.0.0:81/password-email-verification/?email='+email+'&code='+str(code))
            print ('r',r)
            # ForgotPasswordVerification(code, is_user.email)
        return user

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        content = {'message': 'Hello, World!'}
        return Response(content)

class GoogleView(APIView):
    print('google')
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        payload = {'access_token': request.data.get("token")}  # validate the token
        print('request.data.get("token")',request.data.get("token"))
        print('payload',payload)
        r = requests.get('https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
        data = json.loads(r.text)
        print(data)

        if 'error' in data:
            content = {'message': 'wrong google token / this google token is already expired.'}
            print(content)
            return Response(content)

        # create user if not exist
        try:
            user = CustomUser.objects.get(email=data['email'])
        except CustomUser.DoesNotExist:
            user = CustomUser()
            user.username = data['email']
            # provider random default password
            user.password = make_password(BaseUserManager().make_random_password())
            user.email = data['email']
            user.is_active= True
            user.save()

        token = RefreshToken.for_user(user)  # generate token without username & password
        response = {}
        response['username'] = user.username
        response['access_token'] = str(token.access_token)
        response['refresh_token'] = str(token)
        return Response(response)

class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        # id = self.request.query_params.get('id', None)
        # print(id)
        print('requst',request.user)
        user_exists= CustomUser.objects.filter(technology=request.user.technology)
        if user_exists.exists():
            user = user_exists.first()
            user.last_seen = datetime.now()
            user.save()
            content = {'user.last_seen':datetime.now()}
            return Response(content)
        content = {'message':'No user '}
        return Response(content,status=status.HTTP_226_IM_USED)

class OTP(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        otp = request.user.verification_code
        return Response(otp,status=status.HTTP_226_IM_USED)