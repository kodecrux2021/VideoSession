from django.db import models
from datetime import datetime
from technology.models import Technology,Subtechnology,Topic
from user.models import Educator

# Create your models here.

class Session(models.Model):
    date = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    educator = models.ForeignKey(Educator, related_name="bill", on_delete=models.CASCADE, blank=True, null=True)
    audio = models.FileField(upload_to='videos/', null=True, verbose_name="audio")
    video = models.FileField(upload_to='videos/', null=True, verbose_name="video")
    topic = models.ManyToManyField(Topic)






