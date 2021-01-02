from rest_framework import serializers
from .models import Technology,Subtechnology,Topic





class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        read_only_fields = ('id',)
        fields = ('id','name','sub_technology')


class SubtechnologySerializer(serializers.ModelSerializer):
    topic = TopicSerializer(many=True,read_only=True)
    class Meta:
        model = Subtechnology
        read_only_fields = ('id',)
        fields = ('id','name','topic','technology')

class TechnologySerializer(serializers.ModelSerializer):
    sub_technology = SubtechnologySerializer(many=True,read_only=True)
    class Meta:
        model = Technology
        read_only_fields = ('id',)
        fields = ('id','name','sub_technology')