from django.db import models
from user.models import Educator,Clients
from datetime import datetime




class Hire(models.Model):
    client = models.ForeignKey(Clients,related_name="hire_client",on_delete=models.CASCADE,null=True,blank=True)
    Educator = models.ForeignKey(Educator,related_name="hire_client",on_delete=models.CASCADE,null=True,blank=True)
    payment_pending = models.BooleanField(default=False)
    payment_success = models.BooleanField(default=False)
    date  = models.DateTimeField(default=datetime.now(),null=True, blank=True)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.client)



