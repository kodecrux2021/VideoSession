from rest_framework import serializers
from .models import Message,Conversation



class MessageSerializer(serializers.ModelSerializer):
    user =  serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    print('sent_by',user)
    class Meta:
        model = Message
        fields = ('sent_by','read_by','date','message','is_read','attachment','user','conversation')

    def save(self, **kwargs):
        """Include default for read_only `user` field"""
        kwargs["sent_by"] = self.fields["user"].get_default()
        return super().save(**kwargs)


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = '__all__'