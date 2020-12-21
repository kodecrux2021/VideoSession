from django.db import models
from datetime import datetime



# Create your models here.

class Proposal(models.Model):
    job_requiremennt = models.CharField(max_length=100,null=True,blank=True)

