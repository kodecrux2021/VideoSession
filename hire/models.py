from django.db import models
from user.models import Educator,Clients
from datetime import datetime
from django.utils.translation import ugettext_lazy as _
from notification.models import Notification

PAYMENT_STATUS = (
    ("SUCCESS", _("Success")),
    ("DONE", _("Done But Pending")),
    ("NOT_DONE", _("Not Done")),
)

HIRING_STATUS = (
    ("HIRED", _("HIRED But Pending")),
    ("INSTRUCTOR_ACCEPTED", _("Instructor Accepted")),
    ("NOT_DONE", _("Not Done")),
)

class Hire(models.Model):
    request = models.CharField(max_length=150, blank=True, null=True)
    project_title = models.CharField(max_length=300, blank=True, null=True)
    deliverables = models.TextField(blank=True, null=True)
    additional_information = models.TextField(blank=True, null=True)
    budget = models.FloatField(blank=True, null=True)
    deadlines = models.DateTimeField(null=True, blank=True)
    payment_status = models.CharField(
        max_length=8,
        choices=PAYMENT_STATUS,
        default="NOT_DONE",
    )
    hiring_status = models.CharField(
        max_length=19,
        choices=HIRING_STATUS,
        default="NOT_DONE",
    )
    date  = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.client)
    def save():
        pass