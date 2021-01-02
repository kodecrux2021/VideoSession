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
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework import generics, permissions, status, views







class EducatorViewset(viewsets.ModelViewSet):
    queryset = models.Educator.objects.all()
    serializer_class = serializers.EducatorSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('user__technology','user__sub_technology','user__topic','conversation')


class ClientViewset(viewsets.ModelViewSet):
    queryset = models.Clients.objects.all()
    serializer_class = serializers.ClientSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ('technology','sub_technology','topic')






















# class CurrectRoleViewset(generics.ListAPIView):
#     serializer_class = serializers.CurrentUserSerializer
#
#     def get_queryset(self):
#         username = self.request.query_params.get('username', None)
#         print('username',username)
#         carerUser = models.CustomUser.objects.filter(username=str(username))
#         return carerUser




# class CurrentUserViewset(viewsets.ModelViewSet):
#     serializer_class = serializers.CurrentUserSerializer
#
#     def get_queryset(self):
#        currentuser = models.CustomUser.objects.filter(id=self.request.user.id)
#        print('currentuser',self.request.user)
#        return currentuser




