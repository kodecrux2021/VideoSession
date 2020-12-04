from rest_framework import serializers
from .models import CustomUser
import random
from twilio.rest import Client
from django.conf import settings


class CustomUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        read_only_fields = ('otp',)
        fields = ('username','otp','password','email','state','school','city','pincode','phone','is_instructor','is_freelancer','is_codeexpert')
        extra_kwargs = {'password': {'write_only': True}}


    def create(self,validated_data):
        code = random.randint(100000, 999999)
        user = CustomUser(

            username=validated_data['username'],
            email=['email'],
            school=['school'],
            state=['state'],
            city=['city'],
            pincode=['pincode'],
            is_active=False,
            otp=code,
            phone=validated_data['phone'],
        )
        user.set_password(validated_data['password'])
        user.save()
        # if user:
        #     print('I HAVE TO PUT MESSAGE FUNCTION')
        #     otp_verification(user.phone,user.otp)
        return user

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