from django.db import models
from user.models import Educator,Clients
from datetime import datetime
from django.utils.translation import ugettext_lazy as _
from customuser.models import CustomUser
from django.db.models.signals import post_save
from django.dispatch import receiver

PAYMENT_STATUS = (
    ("SUCCESS", _("Success")),
    ("DONE", _("Done But Pending")),
    ("NOT_DONE", _("Not Done")),
)

HIRING_STATUS = (
    ("HIRED", _("HIRED But Pending")),
    ("INSTRUCTOR_ACCEPTED", _("Instructor Accepted")),
    ("INSTRUCTOR_DECLINED", _("Instructor Declined")),
    ("NOT_DONE", _("Not Done")),
)

class Hire(models.Model):
    request = models.CharField(max_length=150, blank=True, null=True)
    project_title = models.CharField(max_length=300, blank=True, null=True)
    order_id = models.CharField(max_length=300, blank=True, null=True)
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
    sent_by = models.ForeignKey(CustomUser, related_name="created_contracts", on_delete=models.CASCADE, blank=True, null=True)
    recieved_by = models.ForeignKey(CustomUser, related_name="recieved_contracts", on_delete=models.CASCADE, blank=True, null=True)
    date  = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.sent_by) + str(self.recieved_by)

from notification.models import Request

@receiver(post_save, sender=Hire, dispatch_uid="update_stock_count")
def update_request(sender, instance, **kwargs):
    from notification.models import Notification
    print("Request not accepted",instance,instance.sent_by,instance.recieved_by )
    print("Request accepted",instance,instance.sent_by,instance.recieved_by )
    if not Request.objects.filter(type="HIRE",contract=instance,
        sent_by=instance.sent_by,recieved_by=instance.recieved_by).exists():
        print("Request Sent",instance,instance.sent_by,instance.recieved_by )
        request = Request.objects.create(sent_by=instance.sent_by,recieved_by=instance.recieved_by,type="HIRE",contract=instance,
                        accepted = None)
        Notification.objects.create(request=request,user=instance.recieved_by,sent_by=instance.sent_by,accepted_by=instance.recieved_by)
    elif Request.objects.filter(type="HIRE",contract=instance,
        sent_by=instance.sent_by,recieved_by=instance.recieved_by).exists() :
        request = Request.objects.filter(sent_by=instance.sent_by,recieved_by=instance.recieved_by,type="HIRE",contract=instance).first()
        if instance.hiring_status == "HIRED":
            request.accepted = True
            request.save()
            Notification.objects.create(sent_by=instance.sent_by,request=request,user=instance.sent_by,accepted_by=instance.recieved_by,
                )
        elif instance.hiring_status == "INSTRUCTOR_DECLINED":
            request.accepted = False
            request.save()
            Notification.objects.create(sent_by=instance.sent_by,request=request,user=instance.sent_by,accepted_by=instance.recieved_by)
    # if instance.accepted:



































# from django.db import models
# from user.models import Educator,Clients
# from datetime import datetime
# from django.utils.translation import ugettext_lazy as _
# from customuser.models import CustomUser
# from django.db.models.signals import post_save
# from django.dispatch import receiver
#
# PAYMENT_STATUS = (
#     ("SUCCESS", _("Success")),
#     ("DONE", _("Done But Pending")),
#     ("NOT_DONE", _("Not Done")),
# )
#
# HIRING_STATUS = (
#     ("HIRED", _("HIRED But Pending")),
#     ("INSTRUCTOR_ACCEPTED", _("Instructor Accepted")),
#     ("NOT_DONE", _("Not Done")),
# )
#
# class Hire(models.Model):
#     request = models.CharField(max_length=150, blank=True, null=True)
#     project_title = models.CharField(max_length=300, blank=True, null=True)
#     deliverables = models.TextField(blank=True, null=True)
#     additional_information = models.TextField(blank=True, null=True)
#     budget = models.FloatField(blank=True, null=True)
#     deadlines = models.DateTimeField(null=True, blank=True)
#     payment_status = models.CharField(
#         max_length=8,
#         choices=PAYMENT_STATUS,
#         default="NOT_DONE",
#     )
#     hiring_status = models.CharField(
#         max_length=19,
#         choices=HIRING_STATUS,
#         default="NOT_DONE",
#     )
#     sent_by = models.ForeignKey(CustomUser, related_name="created_contracts", on_delete=models.CASCADE, blank=True, null=True)
#     recieved_by = models.ForeignKey(CustomUser, related_name="recieved_contracts", on_delete=models.CASCADE, blank=True, null=True)
#     date  = models.DateTimeField(null=True, blank=True)
#
#     def __str__(self):
#         """String for representing the Model object."""
#         return str(self.sent_by) + str(self.recieved_by)
#
# from notification.models import Request
#
# @receiver(post_save, sender=Hire, dispatch_uid="update_stock_count")
# def update_request(sender, instance, **kwargs):
#     from notification.models import Notification
#     print("Request not accepted",instance,instance.sent_by,instance.recieved_by )
#     print("Request accepted",instance,instance.sent_by,instance.recieved_by )
#     if not Request.objects.filter(type="HIRE",contract=instance,
#         sent_by=instance.sent_by,recieved_by=instance.recieved_by).exists():
#         print("Request accepted",instance,instance.sent_by,instance.recieved_by )
#         request = Request.objects.create(sent_by=instance.sent_by,recieved_by=instance.recieved_by,type="HIRE",contract=instance)
#         Notification.objects.create(request=request,user=instance.sent_by,accepted_by=instance.recieved_by)
#     # if instance.accepted:
