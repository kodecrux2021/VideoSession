from django.db import models
from customuser.models import CustomUser
from datetime import datetime
from message.models import Conversation




class Clients(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    job_description = models.TextField(blank=True,null= True)
    profile_pic =  models.ImageField(upload_to ='profile_pics/',null=True,blank=True, max_length=255)
    last_seen =  models.DateTimeField(default=datetime.now(),null=True, blank=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.user.first_name)



class Educator(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,related_name='educator_user',null=True, blank=True)
    fees = models.IntegerField(null=True, blank=True)
    date  = models.DateTimeField(default=datetime.now(),null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True)
    designation = models.CharField(max_length=300,null=True, blank=True)
    profile_pic =  models.ImageField(upload_to ='profile_pics/',null=True,blank=True, max_length=255)
    last_seen =  models.DateTimeField(default=datetime.now(),null=True, blank=True)
    conversation = models.ManyToManyField(Conversation, related_name="conversation_includes", blank=True, null=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.user)

