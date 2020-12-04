from django.contrib.auth.models import AbstractUser
from django.db import models




class CustomUser(AbstractUser):
    state = models.CharField(max_length=15, blank=True, null=True)
    city = models.CharField(max_length=15, blank=True, null=True)
    pincode = models.CharField(max_length=15, blank=True, null=True)
    school = models.CharField(max_length=15, blank=True, null=True)
    phone = models.IntegerField(blank=True, null=True)
    is_codeexpert  = models.BooleanField(default=False)
    is_instructor  = models.BooleanField(default=False)
    is_freelancer = models.BooleanField(default=False)
    otp = models.CharField(blank=True, max_length=255,null=True)

    # def __str__(self):
    #     return self.phone