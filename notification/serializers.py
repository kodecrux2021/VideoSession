from rest_framework import serializers
from . models import Notification,Request

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        read_only_fields = ('id','request','user','seen_by','created_at')
        fields = ('id','request','user','seen_by','created_at')

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ('id','sent_by','recieved_by','datetime','accepted')