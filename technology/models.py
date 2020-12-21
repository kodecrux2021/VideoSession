from django.db import models
from datetime import datetime



# Create your models here.


class Technology(models.Model):
    name = models.CharField(blank=True, default=1,max_length=500)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.name)


class Subtechnology(models.Model):
    name = models.CharField(blank=True, default=1,max_length=500)
    technology = models.ForeignKey(Technology,related_name="sub_technology",on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.name)

class Topic(models.Model):
    name = models.CharField(blank=True, default=1,max_length=500)
    sub_technology = models.ForeignKey(Subtechnology,related_name="topic",on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.name)

