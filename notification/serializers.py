from rest_framework import serializers
from . models import Notification,Request
from customuser.serializers import CustomUserSerializers
from rest_framework.serializers import ReadOnlyField
from customuser.models import CustomUser
from message.models import Conversation

class NotificationSerializer(serializers.ModelSerializer):
    sent_by_profile_pic = serializers.SerializerMethodField(source='accepted_by.profile_pic', read_only=True)
    sent_by_first_name = serializers.SerializerMethodField(source='accepted_by.first_name', read_only=True)
    sent_by_last_name = serializers.SerializerMethodField(source='accepted_by.last_name', read_only=True)
    recieved_by_profile_pic = serializers.SerializerMethodField(source='accepted_by.profile_pic', read_only=True)
    recieved_by_first_name = serializers.SerializerMethodField(source='accepted_by.first_name', read_only=True)
    recieved_by_last_name = serializers.SerializerMethodField(source='accepted_by.last_name', read_only=True)
    conversation = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()
    contract = serializers.SerializerMethodField()
    hiring_status = serializers.SerializerMethodField()
    #user_first_name = ReadOnlyField(source='sent_by.first_name')
    class Meta:
        model = Notification
        read_only_fields = ('id','request','created_at','accepted_by',
            "type","contract")
        fields = ('id','request','user','seen_by','created_at','conversation',
            'sent_by_first_name','sent_by_last_name','sent_by_profile_pic',
            'recieved_by_first_name','recieved_by_last_name','recieved_by_profile_pic',
            "type","contract","hiring_status","sent_by"
            )
    def get_sent_by_profile_pic(self, obj):
        if obj.sent_by:
            return obj.sent_by.profile_pic.url if obj.sent_by.profile_pic else None
    def get_sent_by_first_name(self, obj):
        if obj.sent_by:
            return obj.sent_by.first_name
    def get_sent_by_last_name(self, obj):
        if obj.sent_by:
            return obj.sent_by.last_name
    def get_recieved_by_profile_pic(self, obj):
        if obj.accepted_by:
            return obj.accepted_by.profile_pic.url if obj.accepted_by.profile_pic else None
    def get_recieved_by_first_name(self, obj):
        if obj.accepted_by:
            return obj.accepted_by.first_name
    def get_recieved_by_last_name(self, obj):
        if obj.accepted_by:
            return obj.accepted_by.last_name
    def get_request_status(self, obj):
        if obj.request:
            return obj.request.accepted
    def get_contract(self, obj):
        if obj.request:
            if obj.request.contract:
                return obj.request.contract.id
    def get_hiring_status(self, obj):
        if obj.request:
            if obj.request.contract:
                return obj.request.contract.hiring_status
    def get_conversation(self, obj):
        if obj.accepted_by and obj.user:
            conversation = Conversation.objects.filter(includes__in=[obj.accepted_by.id,obj.sent_by.id]).first() if obj.sent_by else Conversation.objects.filter(includes__in=[obj.accepted_by.id,obj.user.id]).first()
            if conversation:
                return conversation.id
    def get_type(self, obj):
        if obj.request:
            return obj.request.type

class RequestSerializer(serializers.ModelSerializer):
    # user_profile_pic = ReadOnlyField(source='sent_by.profile_pic.url')
    # user_first_name = ReadOnlyField(source='sent_by.first_name')
    # user_last_name = ReadOnlyField(source='sent_by.last_name')
    # user_profile_pic = serializers.RelatedField(source='sent_by.profile_pic', read_only=True)
    # user_first_name = serializers.RelatedField(source='sent_by.first_name', read_only=True)
    # user_last_name = serializers.RelatedField(source='sent_by.last_name', read_only=True)
    class Meta:
        model = Request
        # read_only_fields = ('user_first_name','user_last_name','user_profile_pic')
        fields = ('id','sent_by',
            'sent_by','recieved_by',
            # 'user_first_name','user_last_name','user_profile_pic',
            'datetime','accepted','type')

class RequestReadSerializer(serializers.ModelSerializer):
    user_profile_pic = serializers.SerializerMethodField(source='sent_by.profile_pic', read_only=True)
    user_first_name = serializers.SerializerMethodField(source='sent_by.first_name', read_only=True)
    user_last_name = serializers.SerializerMethodField(source='sent_by.last_name', read_only=True)
    # user = serializers.RelatedField(source='sent_by', read_only=True)
    class Meta:
        model = Request
        # read_only_fields = ('user_first_name','user_last_name','user_profile_pic')
        fields = ('id',#'sent_by',
            # 'first_name','recieved_by__first_name',
            # 'user',
            'user_first_name','user_last_name','user_profile_pic',
            'datetime','accepted','type')
    def get_user_profile_pic(self, obj):
        return obj.sent_by.profile_pic.url if obj.sent_by.profile_pic else None
    def get_user_first_name(self, obj):
        return obj.sent_by.first_name
    def get_user_last_name(self, obj):
        return obj.sent_by.last_name








































# from rest_framework import serializers
# from . models import Notification,Request
# from customuser.serializers import CustomUserSerializers
# from rest_framework.serializers import ReadOnlyField
# from customuser.models import CustomUser
# from message.models import Conversation
#
# class NotificationSerializer(serializers.ModelSerializer):
#     user_profile_pic = serializers.SerializerMethodField(source='accepted_by.profile_pic', read_only=True)
#     user_first_name = serializers.SerializerMethodField(source='accepted_by.first_name', read_only=True)
#     user_last_name = serializers.SerializerMethodField(source='accepted_by.last_name', read_only=True)
#     conversation = serializers.SerializerMethodField()
#     type = serializers.SerializerMethodField()
#     contract = serializers.SerializerMethodField()
#     #user_first_name = ReadOnlyField(source='sent_by.first_name')
#     class Meta:
#         model = Notification
#         read_only_fields = ('id','request','seen_by','created_at','accepted_by',
#             "type","contract")
#         fields = ('id','request','user','seen_by','created_at','conversation',
#             'user_first_name','user_last_name','user_profile_pic',
#             "type","contract"
#             )
#     def get_user_profile_pic(self, obj):
#         if obj.accepted_by:
#             return obj.accepted_by.profile_pic.url if obj.accepted_by.profile_pic else None
#     def get_contract(self, obj):
#         if obj.request:
#             if obj.request.contract:
#                 return obj.request.contract.id
#     def get_conversation(self, obj):
#         if obj.accepted_by and obj.user:
#             conversation = Conversation.objects.filter(includes__in=[obj.accepted_by.id,obj.user.id]).first()
#             return conversation.id
#     def get_user_first_name(self, obj):
#         if obj.accepted_by:
#             return obj.accepted_by.first_name
#     def get_type(self, obj):
#         if obj.request:
#             return obj.request.type
#     def get_user_last_name(self, obj):
#         if obj.accepted_by:
#             return obj.accepted_by.last_name
# class RequestSerializer(serializers.ModelSerializer):
#     # user_profile_pic = ReadOnlyField(source='sent_by.profile_pic.url')
#     # user_first_name = ReadOnlyField(source='sent_by.first_name')
#     # user_last_name = ReadOnlyField(source='sent_by.last_name')
#     # user_profile_pic = serializers.RelatedField(source='sent_by.profile_pic', read_only=True)
#     # user_first_name = serializers.RelatedField(source='sent_by.first_name', read_only=True)
#     # user_last_name = serializers.RelatedField(source='sent_by.last_name', read_only=True)
#     class Meta:
#         model = Request
#         # read_only_fields = ('user_first_name','user_last_name','user_profile_pic')
#         fields = ('id','sent_by',
#             'sent_by','recieved_by',
#             # 'user_first_name','user_last_name','user_profile_pic',
#             'datetime','accepted','type')
#
# class RequestReadSerializer(serializers.ModelSerializer):
#     user_profile_pic = serializers.SerializerMethodField(source='sent_by.profile_pic', read_only=True)
#     user_first_name = serializers.SerializerMethodField(source='sent_by.first_name', read_only=True)
#     user_last_name = serializers.SerializerMethodField(source='sent_by.last_name', read_only=True)
#     # user = serializers.RelatedField(source='sent_by', read_only=True)
#     class Meta:
#         model = Request
#         # read_only_fields = ('user_first_name','user_last_name','user_profile_pic')
#         fields = ('id',#'sent_by',
#             # 'first_name','recieved_by__first_name',
#             # 'user',
#             'user_first_name','user_last_name','user_profile_pic',
#             'datetime','accepted','type')
#     def get_user_profile_pic(self, obj):
#         return obj.sent_by.profile_pic.url if obj.sent_by.profile_pic else None
#     def get_user_first_name(self, obj):
#         return obj.sent_by.first_name
#     def get_user_last_name(self, obj):
#         return obj.sent_by.last_name