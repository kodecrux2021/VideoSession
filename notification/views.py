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
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['user']
    http_method_names = ['get']

    def list(self, request):
        queryset = self.queryset.filter(user=self.request.user)
        serializer = serializers.NotificationSerializer(queryset, many=True)
        data = serializer.data
        print('data',data)
        for element in data:
            print('element',element)
            try:
                user = CustomUser.objects.get(id=element["user"])
                sent_by_user = CustomUser.objects.get(id=element["sent_by"])
                name = f'{user.first_name} {user.last_name}'
                sent_by_user_name = f'{sent_by_user.first_name} {sent_by_user.last_name}'
                print('name',name)
                print('sent_by',sent_by_user_name)
                element["user"] = name
                element['sent_by'] = sent_by_user_name
            except:
                element["user"] = ""
                element['sent_by'] = ""
        return Response(data)




class RequestViewset(viewsets.ModelViewSet):
    queryset = models.Request.objects.all()
    serializer_class = serializers.RequestSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['recieved_by']

    # filter_backends = [DjangoFilterBackend]
    # filter_fields = ['recieved_by']

    def get_queryset(self):
        """Return objects for the current authenticated users only"""
        return self.queryset.filter(recieved_by=self.request.user, ).exclude(accepted=True)


class RequestReadViewset(viewsets.ModelViewSet):
    queryset = models.Request.objects.all()
    serializer_class = serializers.RequestReadSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['recieved_by']

    # filter_backends = [DjangoFilterBackend]
    # filter_fields = ['recieved_by']

    def get_queryset(self):
        """Return objects for the current authenticated users only"""
        return self.queryset.filter(recieved_by=self.request.user, accepted=False)




































# from rest_framework import viewsets
# from . import serializers
# from . import models
# from customuser.models import CustomUser
# from django.contrib.auth.models import User
# from rest_framework.response import Response
# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework import generics, permissions, status, views
# from rest_framework.permissions import IsAuthenticated
#
#
#
#
# class NotificationViewset(viewsets.ModelViewSet):
#     queryset = models.Notification.objects.all()
#     serializer_class = serializers.NotificationSerializer
#     permission_classes = [permissions.AllowAny]
#     filter_backends = [DjangoFilterBackend]
#     filter_fields = ['user']
#     http_method_names = ['get', ]
#
#     def list(self,request, pk=None):
#         queryset = models.Notification.objects.filter(user=request.user)
#         serializer = serializers.NotificationSerializer(queryset,many=True)
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
# class RequestViewset(viewsets.ModelViewSet):
#     queryset = models.Request.objects.all()
#     serializer_class = serializers.RequestSerializer
#     permission_classes = (IsAuthenticated,)
#     filter_backends = [DjangoFilterBackend]
#     filter_fields = ['recieved_by']
#
#
#     # filter_backends = [DjangoFilterBackend]
#     # filter_fields = ['recieved_by']
#
#     def get_queryset(self):
#         """Return objects for the current authenticated users only"""
#         return self.queryset.filter(recieved_by=self.request.user,accepted=False)
#
# class RequestReadViewset(viewsets.ModelViewSet):
#     queryset = models.Request.objects.all()
#     serializer_class = serializers.RequestReadSerializer
#     permission_classes = (IsAuthenticated,)
#     filter_backends = [DjangoFilterBackend]
#     filter_fields = ['recieved_by']
#
#
#     # filter_backends = [DjangoFilterBackend]
#     # filter_fields = ['recieved_by']
#
#     def get_queryset(self):
#         """Return objects for the current authenticated users only"""
#         return self.queryset.filter(recieved_by=self.request.user,accepted=False)
