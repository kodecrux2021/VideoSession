from django.db import models
from datetime import datetime
from customuser.models import CustomUser

# Create your models here.

class Conversation(models.Model):
    last_message_datetime = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    archived_by = models.ManyToManyField(CustomUser, related_name="conversation_archived", blank=True, null=True)
    includes = models.ManyToManyField(CustomUser, related_name="conversation_includes", blank=True, null=True)
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



