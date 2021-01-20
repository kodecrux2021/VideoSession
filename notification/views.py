from rest_framework import viewsets
from . import serializers
from . import models
from customuser.models import CustomUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, status, views
from rest_framework.permissions import IsAuthenticated




class NotificationViewset(viewsets.ModelViewSet):
    queryset = models.Notification.objects.all()
    serializer_class = serializers.NotificationSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['user']
    http_method_names = ['get', ]

    def list(self,request, pk=None):
        queryset = models.Notification.objects.all()
        serializer = serializers.NotificationSerializer(queryset,many=True)
        data = serializer.data
        for element in data:
            try:
                user = CustomUser.objects.get(id=element["user"])
                name = f'{user.first_name} {user.last_name}'
                element["user"] = name 
            except:
                element["user"] = ""
        return Response(data)

class RequestViewset(viewsets.ModelViewSet):
    queryset = models.Request.objects.all()
    serializer_class = serializers.RequestSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['recieved_by']

    def get_queryset(self):
        """Return objects for the current authenticated users only"""
       
    # filter_backends = [DjangoFilterBackend]
    # filter_fields = ['recieved_by']

    def get_queryset(self):
        """Return objects for the current authenticated users only"""
        return self.queryset.filter(sent_by=self.request.user,accepted=False)
