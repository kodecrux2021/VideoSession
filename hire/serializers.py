from rest_framework import serializers
from .models import Hire
from customuser.serializers import CustomUserSerializers
from rest_framework.serializers import ReadOnlyField




class HireSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hire
        fields = ('__all__')




