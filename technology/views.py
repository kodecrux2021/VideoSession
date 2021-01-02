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
from .models import Technology,Subtechnology,Topic
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, status, views




class TechnologyViewset(viewsets.ModelViewSet):
    queryset = models.Technology.objects.all()
    serializer_class = serializers.TechnologySerializer
    permission_classes = [permissions.AllowAny]


    def get(self):
        content = {'message': 'Hello, World!'}
        return Response(content)


class SubtechnologyViewset(viewsets.ModelViewSet):
    queryset = models.Subtechnology.objects.all()
    serializer_class = serializers.SubtechnologySerializer
    permission_classes = [permissions.AllowAny]

    filter_backends = [DjangoFilterBackend]
    filter_fields = ['technology']



class TopicViewset(viewsets.ModelViewSet):
    queryset = models.Topic.objects.all()
    serializer_class = serializers.TopicSerializer
    permission_classes = [permissions.AllowAny]

    filter_backends = [DjangoFilterBackend]
    filter_fields = ['sub_technology']