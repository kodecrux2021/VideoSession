from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.



class SessionViewset(viewsets.ModelViewSet):
    queryset = models.Session.objects.all()
    serializer_class = serializers.SessionSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['topic','educator']