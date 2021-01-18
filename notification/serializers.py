from rest_framework import serializers
from . models import Notification,Request
from customuser.serializers import CustomUserthirdSerializers
from rest_framework.serializers import ReadOnlyField

class NotificationSerializer(serializers.ModelSerializer):
    #user_first_name = ReadOnlyField(source='sent_by.first_name')
    class Meta:
        model = Notification
        read_only_fields = ('id','request','seen_by','created_at','accepted_by')
        fields = ('id','request','user','seen_by','created_at','accepted_by')

class RequestSerializer(serializers.ModelSerializer):
    #user_profile_pic = ReadOnlyField(source='sent_by.profile_pic.url')
    #user_first_name = ReadOnlyField(source='sent_by.first_name')
    #user_last_name = ReadOnlyField(source='sent_by.last_name')
    # user_profile_pic = serializers.RelatedField(source='sent_by.profile_pic', read_only=True)
    # user_first_name = serializers.RelatedField(source='sent_by.first_name', read_only=True)
    # user_last_name = serializers.RelatedField(source='sent_by.last_name', read_only=True)
    class Meta:
        model = Request
       # read_only_fields = ('user_first_name','user_last_name','user_profile_pic')
        fields = ('id','sent_by','recieved_by','datetime','accepted','type')

