from rest_framework import serializers
from .models import Hire
from customuser.serializers import CustomUserSerializers
from rest_framework.serializers import ReadOnlyField




class HireSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hire
        fields = ('__all__')

    def get_sent_by(self, obj):
        if obj.sent_by:
            return obj.sent_by.first_name + " " + obj.sent_by.last_name

    def get_recieved_by(self, obj):
        if obj.recieved_by:
            return obj.recieved_by.first_name + " " + obj.recieved_by.last_name
    def update(self, instance, validated_data):
        # Update the Foo instance
        instance.hiring_status = validated_data['hiring_status']
        instance.save()
        return instance

















# from rest_framework import serializers
# from .models import Hire
# from customuser.serializers import CustomUserSerializers
# from rest_framework.serializers import ReadOnlyField
#
#
#
#
# class HireSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Hire
#         fields = ('__all__')
#
#
#
#
