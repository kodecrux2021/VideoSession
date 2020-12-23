from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.response import Response
# from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.



class MessageViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['sent_by','read_by','conversation']



class ConversationViewset(viewsets.ModelViewSet):
    queryset = models.Conversation.objects.all()
    serializer_class = serializers.ConversationSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['includes',]
