from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, permissions, status, views

from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from operator import and_
from functools import reduce
# from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.



class MessageViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['sent_by','read_by','conversation']



# class ConversationViewset(viewsets.ModelViewSet):
#     queryset = models.Conversation.objects.all()
#     permission_classes = [permissions.AllowAny]
#     serializer_class = serializers.ConversationSerializer
#     filter_backends = [DjangoFilterBackend]
#     filter_fields = ['includes','archived_by']

class ConversationViewset(viewsets.ModelViewSet):
    queryset = models.Conversation.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.ConversationSerializer
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['includes', 'archived_by']

    # def get_queryset(self):
    #     queryset = models.Conversation.objects.all()
    #     includes = eval(self.request.query_params.get('includes'))
    #     # for include in includes:
    #     #     queryset = queryset.filter(includes__in=include)
    #     queryset = queryset.filter(reduce(and_, [Q(includes__in=c) for c in includes]))
    #     return queryset


class ConversationView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        snippets = models.Conversation.objects.filter(includes=request.user)
        serializer = serializers.ConversationSerializer(snippets, many=True)
        return Response(serializer.data)

    """
    create a new snippet.
    """
    def post(self, request, format=None):
        serializer = serializers.ConversationSerializer(data=request.data)
        # serializer= serializer.data.includes.add(request.user.id)
        print('request.data',request.data)
        if serializer.is_valid():
            serializer.save()
            print('serializer.data',serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



