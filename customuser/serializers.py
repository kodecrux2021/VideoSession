from rest_framework import serializers
from .models import CustomUser
import random
from twilio.rest import Client
from django.conf import settings
from datetime import datetime




class CustomUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        read_only_fields = ('id','last_seen','otp')
        fields = ('id','username','otp','password','email','first_name','last_name','phone','is_instructor','is_freelancer','is_codeexpert','is_client','technology','sub_technology','topic','last_seen')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self,validated_data):
        code = random.randint(100000, 999999)
        user = CustomUser(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone=validated_data['phone'],
            email=['email'],
            state=['state'],
            city=['city'],
            pincode=['pincode'],
            is_active=True,
            otp=code,
            is_instructor=validated_data['is_instructor'],
            is_freelancer=validated_data['is_freelancer'],
            is_codeexpert=validated_data['is_codeexpert'],
            is_client=validated_data['is_client'],
        )
        user.set_password(validated_data['password'])
        user.save()
        user.technology.set(validated_data['technology'])
        user.sub_technology.set(validated_data['sub_technology'])
        user.topic.set(validated_data['topic'])


        # if user:
        #     print('I HAVE TO PUT MESSAGE FUNCTION')
        #     otp_verification(user.phone,user.otp)
        return user
    def update(self, instance, validated_data):
        # Update the Foo instance
        instance.last_seen = datetime.now()
        instance.save()
        print('instance',instance)
        return instance

def otp_verification(mobile_number,otp):
    client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)
    incoming_phone_number = client.incoming_phone_numbers.create(
        phone_number='+15005550006',
    )

    print('fake',incoming_phone_number.sid)
    message = client.messages.create(
        body=otp,
        from_='+15005550006',
        to='+919827792681'
    )

    print('message.sid',message.sid)


class PhoneVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        read_only_fields = ('username', 'email')
        fields = ('username', 'email','phone','otp')