from rest_framework import serializers
from .models import Educator,Clients
from customuser.serializers import CustomUserSerializers
from rest_framework.serializers import ReadOnlyField




class EducatorSerializer(serializers.ModelSerializer):
    user_username = ReadOnlyField(source='user.username')
    user_email = ReadOnlyField(source='user.email')
    user_first_name = ReadOnlyField(source='user.first_name')
    user_last_name = ReadOnlyField(source='user.last_name')
    user_phone = ReadOnlyField(source='user.phone')

    class Meta:
        model = Educator
        fields = ('user','user_username','user_email','user_first_name','user_last_name','user_phone','fees','date','rating',)

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clients
        fields = '__all__'


