from django.db import models
from datetime import datetime
from customuser.models import CustomUser
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Conversation(models.Model):
    last_message_datetime = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    archived_by = models.ManyToManyField(CustomUser, related_name="conversation_archived", blank=True, null=True)
    includes = models.ManyToManyField(CustomUser, related_name="conversation_includes", blank=True, null=True)
    subject = models.CharField(max_length=1200, null=True, blank=True)
    start_date_time = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    end_date_time = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    participant_web_link= models.CharField(max_length=1200, null=True, blank=True)
    teamviewr_id = models.CharField(max_length=1200, null=True, blank=True)
    access_token = models.CharField(max_length=1200, null=True, blank=True)
    refresh_token = models.CharField(max_length=1200, null=True, blank=True)
    conference_call_information = models.CharField(max_length=1200, null=True, blank=True)
    password = models.CharField(max_length=1200, null=True, blank=True)
    def __str__(self):
        return str(self.id)


class Message(models.Model):
    date = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    sent_by = models.ForeignKey(CustomUser, related_name="sent_message", on_delete=models.CASCADE, blank=True, null=True)
    read_by = models.ManyToManyField(CustomUser)
    message = models.CharField(max_length=1200)
    is_read = models.BooleanField(default=False)
    attachment =  models.FileField(upload_to ='uploads/',null=True,blank=True)
    conversation =  models.ForeignKey(Conversation, related_name="conversation_message", on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.message

    class Meta:
        ordering = ('date',)


class TeamViewerTokens(models.Model):
    expire_on = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    access_token = models.CharField(max_length=1200, null=True, blank=True)
    refresh_token = models.CharField(max_length=1200, null=True, blank=True)


