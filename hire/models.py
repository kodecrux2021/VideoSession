from django.db import models
from user.models import Educator,Clients
from datetime import datetime

class HelpingRequest(models.Model):
    type = models.CharField(max_length=150, blank=True, null=True)


class Hire(models.Model):
    helping_request = models.ForeignKey(HelpingRequest,related_name="hire_helping_request",on_delete=models.CASCADE,null=True,blank=True)
    project_title = models.CharField(max_length=300, blank=True, null=True)
    deliverables = models.CharField(max_length=300, blank=True, null=True)
    budget = models.CharField(max_length=300, blank=True, null=True)
    deadlines = models.DateTimeField(default=datetime.now(),null=True, blank=True)
    payment_pending = models.BooleanField(default=False)
    payment_success = models.BooleanField(default=False)
    date  = models.DateTimeField(default=datetime.now(),null=True, blank=True)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.client)



