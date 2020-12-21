from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend


class HireViewset(viewsets.ModelViewSet):
    queryset = models.Hire.objects.all()
    serializer_class = serializers.HireSerializer

    def get(self):
        content = {'message': 'Hello, World!'}
        return Response(content)
    # filter_backends = [DjangoFilterBackend]
    # filterset_fields = ('user__technology', 'user__sub_technology', 'user__topic')



