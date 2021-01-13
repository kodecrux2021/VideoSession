from rest_framework import serializers
from .models import Educator,Clients
from rest_framework.serializers import ReadOnlyField
from message.serializers import ConversationSerializer



class EducatorSerializer(serializers.ModelSerializer):
    user_username = ReadOnlyField(source='user.username')
    user_email = ReadOnlyField(source='user.email')
    user_first_name = ReadOnlyField(source='user.first_name')
    user_last_name = ReadOnlyField(source='user.last_name')
    user_phone = ReadOnlyField(source='user.phone')
    # conversation = ConversationSerializer(many=True,read_only=True)


    class Meta:
        model = Educator
        fields = ('id','user','user_username','user_email','user_first_name','user_last_name','user_phone','fees','date','rating','designation','profile_pic','last_seen','conversation',)

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clients
        fields = '__all__'


