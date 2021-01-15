from rest_framework import serializers
from .models import CustomUser
import random
from twilio.rest import Client
from django.conf import settings
from datetime import datetime




class SocialSerializer(serializers.Serializer):
    provider = serializers.CharField(max_length=255, required=True)
    access_token = serializers.CharField(max_length=4096, required=True, trim_whitespace=True)

class CustomUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        read_only_fields = ('id','pincode','state','city','otp','email','first_name','last_name','technology','sub_technology','topic','last_seen','profile_pic','total_experience','relevant_experience','date_of_birth')
        fields = ('id','username','pincode','state','city','otp','password','email','first_name','last_name','phone','is_instructor','is_freelancer','is_codeexpert','is_client','technology','sub_technology','topic','last_seen','profile_pic','total_experience','relevant_experience','date_of_birth')
        extra_kwargs = {'password': {'write_only': True}}

    def perform_create(self, serializer):
        return serializer.save()

    def create(self,validated_data):
        code = random.randint(100000, 999999)
        user = CustomUser(
            username=validated_data['username'],
            phone=validated_data['phone'],
            is_active=True,
            is_instructor=validated_data['is_instructor'],
            is_freelancer=validated_data['is_freelancer'],
            is_codeexpert=validated_data['is_codeexpert'],
            is_client=validated_data['is_client'],
        )
        user.set_password(validated_data['password'])
        user.save()



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



class CustomUsersecondSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('pincode','state','city','total_experience','relevant_experience','date_of_birth','profile_pic')


    def create(self,validated_data):
        user = CustomUser(
            state=validated_data['state'],
            city=validated_data['city'],
            pincode=validated_data['pincode'],
            total_experience=validated_data['total_experience'],
            relevant_experience=validated_data['relevant_experience'],
            date_of_birth=validated_data['date_of_birth'],
            profile_pic=validated_data['profile_pic'],

        )
        user.is_active=True
        user.save()
        return user


class CustomUserthirdSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name','last_name','technology','sub_technology','topic','last_seen','profile_pic','email','phone','summary')


    def create(self,validated_data):
        user = CustomUser(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            technology=validated_data['technology'],
            sub_technology=validated_data['sub_technology'],
            topic=validated_data['topic'],
            last_seen=validated_data['last_seen'],
            profile_pic=validated_data['profile_pic'],
            email=validated_data['email'],
            phone=validated_data['phone'],
            summary=validated_data['summary'],

        )
        user.save()
        return user

class ForgotPasswordSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        read_only_fields = ('username',)
        fields = ('verification_code','password','username')
        extra_kwargs = {'password': {'write_only': True}}


class ForgotPasswordEmailVerificationSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username',)