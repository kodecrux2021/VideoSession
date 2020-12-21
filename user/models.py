from django.db import models
from customuser.models import CustomUser
from datetime import datetime




class Clients(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    job_description = models.TextField(blank=True,null= True)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.user.first_name)




class Educator(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    fees = models.IntegerField(max_length=100)
    date  = models.DateTimeField(default=datetime.now(),null=True, blank=True)
    rating = models.IntegerField(max_length=100)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.user.first_name)

