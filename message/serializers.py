from rest_framework import serializers
from .models import Message,Conversation
from customuser.serializers import CustomUserSerializers

class MessageSerializer(serializers.ModelSerializer):
    user =  serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    user_profile_pic = serializers.SerializerMethodField(source='sent_by.profile_pic', read_only=True)
    user_first_name = serializers.SerializerMethodField(source='sent_by.first_name', read_only=True)
    user_last_name = serializers.SerializerMethodField(source='sent_by.last_name', read_only=True)
    user_id = serializers.SerializerMethodField(source='sent_by.id', read_only=True)

    class Meta:
        model = Message
        fields = ('id',
                        'user_first_name','user_last_name','user_profile_pic','user_id',
                        'date','message','is_read','attachment','user','conversation')

    def get_user_profile_pic(self, obj):
        if obj.sent_by:
            return obj.sent_by.profile_pic.url if obj.sent_by.profile_pic else None
    def get_user_first_name(self, obj):
        if obj.sent_by:
            return obj.sent_by.first_name
    def get_user_last_name(self, obj):
        if obj.sent_by:
            return obj.sent_by.last_name

    def get_user_id(self, obj):
        if obj.sent_by:
            return obj.sent_by.id

    def save(self, **kwargs):
        """Include default for read_only `user` field"""
        kwargs["sent_by"] = self.fields["user"].get_default()
        return super().save(**kwargs)


class ConversationSerializer(serializers.ModelSerializer):
    includes = CustomUserSerializers(many=True, read_only=True)
    class Meta:
        model = Conversation
        read_only_fields = ('id','last_message_datetime','subject','start_date_time','end_date_time','participant_web_link','teamviewr_id','access_token','refresh_token','conference_call_information','password')
        fields = ('id','includes','archived_by','last_message_datetime','subject','start_date_time','end_date_time','participant_web_link','teamviewr_id','access_token','refresh_token','conference_call_information','password')

        def create(self, validated_data):
            print("validated_data['username']'", validated_data['username'])
            teamviewer_data = Conversation(
                subject=validated_data['ss'],
                start_date_time=validated_data['start_date_time'],
                end_date_time=validated_data['end_date_time'],
                is_active=True,
                participant_web_link=validated_data['participant_web_link'],
                teamviewr_id=validated_data['teamviewr_id'],
                access_token=validated_data['access_token'],
                refresh_token=validated_data['refresh_token'],
                conference_call_information=validated_data['conference_call_information'],
                password=validated_data['password'],
            )
            return teamviewer_data
