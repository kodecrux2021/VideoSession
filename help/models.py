from django.db import models
from datetime import datetime

# Create your models here.


class Help(models.Model):
    date = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    text = models.CharField(max_length=1200)
    troubleshooting = models.BooleanField(default=False)
    debugging = models.BooleanField(default=False)
    tutoring = models.BooleanField(default=False)

    def __str__(self):
        return self.text



