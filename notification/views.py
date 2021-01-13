from rest_framework import viewsets
from . import serializers
from . import models
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, status, views
from rest_framework.permissions import IsAuthenticated




class NotificationViewset(viewsets.ModelViewSet):
    queryset = models.Notification.objects.all()
    serializer_class = serializers.NotificationSerializer
    permission_classes = [permissions.AllowAny]
    # filter_backends = [DjangoFilterBackend]
    # filter_fields = ['recieved_by']
    http_method_names = ['get', ]

    def get(self):
        content = {'message': 'Hello, World!'}
        return Response(content)

class RequestViewset(viewsets.ModelViewSet):
    queryset = models.Request.objects.all()
    serializer_class = serializers.RequestSerializer
    permission_classes = (IsAuthenticated,)
    # filter_backends = [DjangoFilterBackend]
    # filter_fields = ['recieved_by']

    def get_queryset(self):
        """Return objects for the current authenticated users only"""
        return self.queryset.filter(recieved_by=self.request.user,accepted=False)
