from rest_framework import serializers
from .models import Educator,Clients
from message.models import Conversation
from rest_framework.serializers import ReadOnlyField
from message.serializers import ConversationSerializer
from session.serializers import SessionSerializer

class EducatorSerializer(serializers.ModelSerializer):
    user_username = ReadOnlyField(source='user.username')
    user_email = ReadOnlyField(source='user.email')
    user_first_name = ReadOnlyField(source='user.first_name')
    user_last_name = ReadOnlyField(source='user.last_name')
    user_phone = ReadOnlyField(source='user.phone')
    user_id = ReadOnlyField(source='user.id')
    bill = SessionSerializer(read_only=True,many=True)
    #conversation = ReadOnlyField(source ='conversation.id')

   # conversation = ConversationSerializer(many=True,read_only=True)


    class Meta:
        model = Educator
        fields = ('id','user','user_id','user_username','conversation','user_email','user_first_name','user_last_name','user_phone','fees','date','rating','designation','profile_pic','last_seen','is_active','bill',)


    # def to_representation(self, data):
    #     data = super(EducatorSerializer, self).to_representation(data)
    #     print('data',data.get('id'))
    #     print('dataself', self.context['request'].user.id)
    #     data['conversation_id'] = conversation_id
    #     return data
class EducatorCreateSerializer(serializers.ModelSerializer):
    user_username = ReadOnlyField(source='user.username')
    user_email = ReadOnlyField(source='user.email')
    user_first_name = ReadOnlyField(source='user.first_name')
    user_last_name = ReadOnlyField(source='user.last_name')
    user_phone = ReadOnlyField(source='user.phone')
    user_id = ReadOnlyField(source='user.id')

    class Meta:
        model = Educator
        fields = ('id','user','user_id','user_username','conversation','user_email','user_first_name','user_last_name','user_phone','fees','date','rating','designation','profile_pic','last_seen','is_active',)

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clients
        fields = '__all__'


