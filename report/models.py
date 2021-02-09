from django.db import models
from datetime import datetime


# Create your models here.

class Report(models.Model):
    date = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    payment_collected = models.CharField(max_length=1200, null=True, blank=True)

    def __str__(self):
        return str(self.payment_collected)