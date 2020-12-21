from django.contrib.auth.models import AbstractUser
from django.db import models
from technology.models import Technology,Subtechnology,Topic
from datetime import datetime


class CustomUser(AbstractUser):
    phone = models.IntegerField(blank=True, null=True)
    is_codeexpert  = models.BooleanField(default=False)
    is_instructor  = models.BooleanField(default=False)
    is_freelancer = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    otp = models.CharField(blank=True, max_length=255,null=True)
    summary = models.TextField(max_length=500, blank=True)
    security_question = models.CharField(max_length=30, blank=True)
    security_answer = models.CharField(max_length=30, blank=True)
    pincode = models.CharField(max_length=15, blank=True, null=True)
    state = models.CharField(max_length=15, blank=True, null=True)
    city = models.CharField(max_length=15, blank=True, null=True)
    technology = models.ManyToManyField(Technology)
    sub_technology = models.ManyToManyField(Subtechnology)
    topic = models.ManyToManyField(Topic)
    is_active = models.BooleanField(default=False)
    last_seen =  models.DateTimeField(default=datetime.now(),null=True, blank=True)

    def __str__(self):
        return self.username