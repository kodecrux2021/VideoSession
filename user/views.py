from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from message.serializers import ConversationSerializer
from . import models
from message.models import Conversation
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from random import random
from django.views.generic import TemplateView
from django.shortcuts import render, redirect
from user.models import CustomUser, Educator
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
    # permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ('user__technology', 'user__sub_technology', 'user__topic', 'conversation')
    http_method_names = ['get', 'post', 'put']

    def list(self,request, pk=None):
        print ('request.user',request.user.technology.all().values_list('id',flat=True))

        user = request.user.technology.all().values_list('id',flat=True)
        queryset = models.Educator.objects.filter(user__technology__in=user)
        serializer = serializers.EducatorSerializer(queryset,many=True)
        data = serializer.data
        for element in data:
                print("element1",element)
                try:
                    user = CustomUser.objects.get(id=element["user"])
                    name = f'{user.first_name} {user.last_name}'
                    element["user"] = name
                    if Conversation.objects.filter(includes__in=[user.id,request.user.id]).exists():
                        element["converstation"] = Conversation.objects.filter(includes__in=[user.id,request.user.id]).first().id
                except CustomUser.DoesNotExist:
                    print("user",)
       # queryset = models.Conversation.objects.filter(id)
       # print(queryset)
       # datab = serializers.ConversationSerializer
        print(type(data))
        return Response(data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        print("request.data", request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

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


#        # return qs
#     def filter_queryset(self, queryset):
#     #super needs to be called to filter backends to be applied
#         qs = super().filter_queryset(queryset)
#         context = qs.values()
#         for educator in context:
#             context = list(context)
# #print('educator',educator)
#            # print('edu',educator.user.id)
#             print("Hi I am here")
#             c_list= []
#             c_list.append(educator["user_id"])
#             c_list.append(self.request.user.id)
#            # print('c_list',c_list)
#             conversation=Conversation.objects.filter(includes__in=c_list)
#             if conversation.exists():
#                 conversation=conversation.first()
#                 educator['conversation'] = conversation.id
#                # print('conversation',conversation)
#            # print('conv',context)
#         #some extra filtering
#         return context
class EducatorCreateViewset(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = models.Educator.objects.all()
    serializer_class = serializers.EducatorSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post', 'put',]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        print("request.data", request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()


class EducatorView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        serializer = serializers.EducatorSerializer(request.user)
        # content = {'user': serializer.data}
        data = serializer.data
        for element in data:
            try:
                user = CustomUser.objects.get(id=element["user"])
                name = f'{user.first_name} {user.last_name}'
                element["user"] = name
            except:
                element["user"] = ""
        return Response(data)

    # educator_list= Educator.objects.all()
    # context = educator_list.values()

    # for educator in context:
    #     context = list(context)
    #     print('educator',educator)
    #     # print('edu',educator.user.id)
    #     c_list= []
    #     c_list.append(educator["user_id"])
    #     c_list.append(request.user.id)
    #     conversation=Conversation.objects.filter(includes__in=c_list).first()
    #     educator['conversation_id'] = conversation.id
    # #     print('conv',conversation)
    # return JsonResponse(context,safe=False)

    # return Response(content)


class ClientViewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = models.Clients.objects.all()
    serializer_class = serializers.ClientSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ('technology', 'sub_technology', 'topic')



























# from django.shortcuts import render
#
# # Create your views here.
# from django.shortcuts import render
# from rest_framework import viewsets
# from . import serializers
# from message.serializers import ConversationSerializer
# from . import models
# from message.models import Conversation
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import generics
# from random import random
# from django.views.generic import TemplateView
# from django.shortcuts import render,redirect
# from user.models import CustomUser,Educator
# from django.db.models import Q
# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework.views import APIView
# from rest_framework import generics, permissions, status, views
# from message.models import Conversation
# import json
# from django.forms.models import model_to_dict
# from django.http import JsonResponse
#
#
#
#
#
# class EducatorViewset(viewsets.ModelViewSet):
#     # permission_classes = (IsAuthenticated,)
#     queryset = models.Educator.objects.all()
#     serializer_class = serializers.EducatorSerializer
#     permission_classes = [permissions.AllowAny]
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ('user__technology','user__sub_technology','user__topic','conversation')
#     http_method_names = ['get', 'post','put']
#
#
#     def list(self,request, pk=None):
#         print ('request.user',request.user.technology.all().values_list('id',flat=True))
#
#         user = request.user.technology.all().values_list('id',flat=True)
#         queryset = models.Educator.objects.filter(user__technology__in=user)
#         serializer = serializers.EducatorSerializer(queryset,many=True)
#         data = serializer.data
#         for element in data:
#                 print("element1",element)
#                 try:
#                     user = CustomUser.objects.get(id=element["user"])
#                     name = f'{user.first_name} {user.last_name}'
#                     element["user"] = name
#                     if Conversation.objects.filter(includes__in=[user.id,request.user.id]).exists():
#                         element["converstation"] = Conversation.objects.filter(includes__in=[user.id,request.user.id]).first().id
#                 except CustomUser.DoesNotExist:
#                     print("user",)
#        # queryset = models.Conversation.objects.filter(id)
#        # print(queryset)
#        # datab = serializers.ConversationSerializer
#         print(type(data))
#         return Response(data)
#
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         print("request.data",request.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
#
#     def perform_create(self, serializer):
#         serializer.save()
#
#     # def get_queryset(self):
#     #     qs = super(EducatorViewset, self).get_queryset()
#     #     print('qs',qs)
#     #     for i in qs:
#     #         print('i.user',i.last_seen)
#     #     return qs
#
#     # def retrieve(self, request, *args, **kwargs):
#     #     qs = super(EducatorViewset, self).retrive(request, *args, **kwargs)
#     #     print('qs', qs)
#     #     for i in qs:
#     #         print('i.user', i.last_seen)
# #        # return qs
# #     def filter_queryset(self, queryset):
# #     #super needs to be called to filter backends to be applied
# #         qs = super().filter_queryset(queryset)
# #         context = qs.values()
# #         for educator in context:
# #             context = list(context)
# # #print('educator',educator)
# #            # print('edu',educator.user.id)
# #             print("Hi I am here")
# #             c_list= []
# #             c_list.append(educator["user_id"])
# #             c_list.append(self.request.user.id)
# #            # print('c_list',c_list)
# #             conversation=Conversation.objects.filter(includes__in=c_list)
# #             if conversation.exists():
# #                 conversation=conversation.first()
# #                 educator['conversation'] = conversation.id
# #                # print('conversation',conversation)
# #            # print('conv',context)
# #         #some extra filtering
# #         return context
#
# class EducatorCreateViewset(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,)
#     queryset = models.Educator.objects.all()
#     serializer_class = serializers.EducatorCreateSerializer
#
#
#
# class EducatorView(APIView):
#     permission_classes = [permissions.AllowAny]
#     def get(self, request):
#         serializer = serializers.EducatorSerializer(request.user)
#         #content = {'user': serializer.data}
#         data = serializer.data
#         for element in data:
#             try:
#                 user = CustomUser.objects.get(id=element["user"])
#                 name = f'{user.first_name} {user.last_name}'
#                 element["user"] = name
#             except:
#                 element["user"] = ""
#         return Response(data)
#
#        # educator_list= Educator.objects.all()
#        # context = educator_list.values()
#
#         # for educator in context:
#         #     context = list(context)
#         #     print('educator',educator)
#         #     # print('edu',educator.user.id)
#         #     c_list= []
#         #     c_list.append(educator["user_id"])
#         #     c_list.append(request.user.id)
#         #     conversation=Conversation.objects.filter(includes__in=c_list).first()
#         #     educator['conversation_id'] = conversation.id
#         # #     print('conv',conversation)
#         # return JsonResponse(context,safe=False)
#
#
#         # return Response(content)
#
# class ClientViewset(viewsets.ModelViewSet):
#     permission_classes = (IsAuthenticated,)
#     queryset = models.Clients.objects.all()
#     serializer_class = serializers.ClientSerializer
#     permission_classes = [permissions.AllowAny]
#     filterset_fields = ('technology','sub_technology','topic')
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
# # class CurrectRoleViewset(generics.ListAPIView):
# #     serializer_class = serializers.CurrentUserSerializer
# #
# #     def get_queryset(self):
# #         username = self.request.query_params.get('username', None)
# #         print('username',username)
# #         carerUser = models.CustomUser.objects.filter(username=str(username))
# #         return carerUser
#
#
#
#
# # class CurrentUserViewset(viewsets.ModelViewSet):
# #     serializer_class = serializers.CurrentUserSerializer
# #
# #     def get_queryset(self):
# #        currentuser = models.CustomUser.objects.filter(id=self.request.user.id)
# #        print('currentuser',self.request.user)
# #        return currentuser
#
#
#
# from django.shortcuts import render
# import requests
# import sys, json
# def home(request):
#    # get the list of todos
#    # response = requests.get('https://login.teamviewer.com/oauth2/authorize?response_type=code&client_id=388609-YgM2aKpYNsYmThQrs7Cn&redirect_uri=https://community.teamviewer.com/English/discussion/53405/authorization-code/')
#    # print('response.url',response.url,response.status_code)
#    # if response.history:
#    #     print("Request was redirected")
#    #     for resp in response.history:
#    #         print(resp.status_code, resp.url)
#    #     print("Final destination:")
#    #     print(response.status_code, response.url)
#    # else:
#    #     print("Request was not redirected")
#    # # response = requests.get('https://jsonplaceholder.typicode.com/todos/')
#    # # transfor the response to json objects
#    parameters = {
#        "response_type": 'code',
#        "client_id": '388609-YgM2aKpYNsYmThQrs7Cn',
#        "redirect_uri":'https://community.teamviewer.com/English/discussion/53405/authorization-code',
#    }
#    payload = {
#        'response_type': 'code',
#        'redirect_uri':'https://community.teamviewer.com/English/discussion/53405/authorization-code',
#
#    'client_id':'388609 - YgM2aKpYNsYmThQrs7Cn',
#
#    }
#    r = requests.get('https://login.teamviewer.com/oauth2/authorize?response_type=code&client_id=388609-YgM2aKpYNsYmThQrs7Cn&redirect_uri=https://community.teamviewer.com/English/discussion/53405/authorization-code/',
#                     params=parameters)
#    print ('r',r)
#    r.status_code  # 302
#    r.url  # http://github.com, not https.
#    print (r.url)
#    r.headers['https://login.teamviewer.com/oauth2/authorize?response_type=code&client_id=388609-YgM2aKpYNsYmThQrs7Cn&redirect_uri=https://community.teamviewer.com/English/discussion/53405/authorization-code/']  # https://github.com/ -- the redirect destination
#    print (r.headers)
#    todos = r.json()
#    return JsonResponse(todos,safe=False)