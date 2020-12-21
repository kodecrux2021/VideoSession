from django.shortcuts import render
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
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


class MobileVerificationViewset(generics.ListAPIView):
    serializer_class = serializers.PhoneVerificationSerializer

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

    def get(self):
        content = {'message': 'Hello, World!'}
        return Response(content)


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