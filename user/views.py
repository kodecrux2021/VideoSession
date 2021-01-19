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
from message.models import Conversation
import json
from django.forms.models import model_to_dict
from django.http import JsonResponse





class EducatorViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Educator.objects.all()
    serializer_class = serializers.EducatorSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('user__technology','user__sub_technology','user__topic','conversation')

<<<<<<< HEAD
    # def get_queryset(self):
    #     qs = super(EducatorViewset, self).get_queryset()
    #     print('qs',qs)
    #     for i in qs:
    #         print('i.user',i.last_seen)
    #     return qs

    # def retrieve(self, request, *args, **kwargs):
    #     qs = super(EducatorViewset, self).retrive(request, *args, **kwargs)
    #     print('qs', qs)
    #     for i in qs:
    #         print('i.user', i.last_seen)
    #     return qs
    def filter_queryset(self, queryset):
    # super needs to be called to filter backends to be applied
        qs = super().filter_queryset(queryset)
        context = qs.values()
        for educator in context:
            context = list(context)
            print('educator',educator)
            # print('edu',educator.user.id)
            c_list= []
            c_list.append(educator["user_id"])
            c_list.append(self.request.user.id)
            print('c_list',c_list)
            conversation=Conversation.objects.filter(includes__in=c_list)
            if conversation.exists():
                conversation=conversation.first()
                educator['conversation_id'] = conversation.id
                print('conversation',conversation)
            print('conv',context)
        # some extra filtering
        return context

=======
    def get_queryset(self):
        qs = super(EducatorViewset, self).get_queryset()
        print('qs',qs)
        return qs
>>>>>>> 341ee0603f711cd7006dbb050ae7916a1bf19707


class EducatorView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        # serializer = serializers.EducatorSerializer(request.user)
        # content = {'user': serializer.data}
        educator_list= Educator.objects.all()
        context = educator_list.values()
        for educator in context:
            context = list(context)
            print('educator',educator)
            # print('edu',educator.user.id)
            c_list= []
            c_list.append(educator["user_id"])
            c_list.append(request.user.id)
            conversation=Conversation.objects.filter(includes__in=c_list).first()
            educator['conversation_id'] = conversation.id
            print('conv',conversation)
        return JsonResponse(context,safe=False)


        # return Response(content)

class ClientViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
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




