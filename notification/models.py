from django.db import models
from customuser.models import CustomUser
from datetime import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver
from message.models import Conversation
from hire.models import Hire

REQUEST_CHOICES = (
    ('MESSAGE','MESSAGE'),
    ('HIRE', 'HIRE'),
)

class Request(models.Model):
    sent_by = models.ForeignKey(CustomUser,related_name="sent_by_requsts", on_delete=models.CASCADE,null=True,blank=True)
    recieved_by = models.ForeignKey(CustomUser,related_name="recieved_by_requests", on_delete=models.CASCADE,null=True,blank=True)
    contract = models.ForeignKey(Hire,related_name="requests", on_delete=models.CASCADE,null=True,blank=True)
    datetime =  models.DateTimeField(default=datetime.now(),null=True, blank=True)
    accepted = models.BooleanField(blank=True,null=True)
    type = models.CharField(max_length=100, choices=REQUEST_CHOICES, null=True, blank=True)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.recieved_by)


class Notification(models.Model):
    request = models.ForeignKey(Request,related_name="notification_request", on_delete=models.CASCADE,null=True,blank=True)
    user = models.ForeignKey(CustomUser,related_name="users_notification", on_delete=models.CASCADE,null=True,blank=True)
    seen_by =   models.BooleanField(default=False,null=True, blank=True)
    created_at =  models.DateTimeField(default=datetime.now(),null=True, blank=True)
    accepted_by = models.ForeignKey(CustomUser,related_name="accepted_by_notification", on_delete=models.CASCADE,null=True,blank=True)
    sent_by = models.ForeignKey(CustomUser,
        related_name="sent_by_notification", on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        """String for representing the Model object."""
        return str(self.user)

@receiver(post_save, sender=Request, dispatch_uid="update_stock_count")
def update_request(sender, instance, **kwargs):
    print("Request not accepted",instance,instance.sent_by,instance.recieved_by )
    if instance.accepted and instance.type != "HIRE":
        print("Request accepted",instance,instance.sent_by,instance.recieved_by )
        if not Notification.objects.filter(user=instance.sent_by,
            request=instance,
            accepted_by=instance.recieved_by).exists():
            Notification.objects.create(request=instance,user=instance.sent_by,accepted_by=instance.recieved_by,sent_by=instance.recieved_by)
            print("Request accepted",instance,instance.sent_by,instance.recieved_by )
            conversation = Conversation.objects.create(last_message_datetime=datetime.now())
            conversation.includes.add(instance.sent_by.id,instance.recieved_by.id)









































# from django.db import models
# from customuser.models import CustomUser
# from datetime import datetime
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from message.models import Conversation
# from hire.models import Hire
#
# REQUEST_CHOICES = (
#     ('MESSAGE','MESSAGE'),
#     ('HIRE', 'HIRE'),
# )
#
# class Request(models.Model):
#     sent_by = models.ForeignKey(CustomUser,related_name="sent_by_notification", on_delete=models.CASCADE,null=True,blank=True)
#     recieved_by = models.ForeignKey(CustomUser,related_name="recieved_by_notification", on_delete=models.CASCADE,null=True,blank=True)
#     contract = models.ForeignKey(Hire,related_name="requests", on_delete=models.CASCADE,null=True,blank=True)
#     datetime =  models.DateTimeField(default=datetime.now(),null=True, blank=True)
#     accepted = models.BooleanField(default=False)
#     type = models.CharField(max_length=100, choices=REQUEST_CHOICES, null=True, blank=True)
#
#     def __str__(self):
#         """String for representing the Model object."""
#         return str(self.recieved_by)
#
#
# class Notification(models.Model):
#     request = models.ForeignKey(Request,related_name="notification_request", on_delete=models.CASCADE,null=True,blank=True)
#     user = models.ForeignKey(CustomUser,related_name="users_notification", on_delete=models.CASCADE,null=True,blank=True)
#     seen_by =   models.BooleanField(default=False,null=True, blank=True)
#     created_at =  models.DateTimeField(default=datetime.now(),null=True, blank=True)
#     accepted_by = models.ForeignKey(CustomUser,related_name="accepted_by_notification", on_delete=models.CASCADE,null=True,blank=True)
#
#
#
#     def __str__(self):
#         """String for representing the Model object."""
#         return str(self.user)
#
# @receiver(post_save, sender=Request, dispatch_uid="update_stock_count")
# def update_request(sender, instance, **kwargs):
#     print("Request not accepted",instance,instance.sent_by,instance.recieved_by )
#     if instance.accepted:
#         print("Request accepted",instance,instance.sent_by,instance.recieved_by )
#         if not Notification.objects.filter(request=instance,user=instance.sent_by,accepted_by=instance.recieved_by).exists():
#             Notification.objects.create(request=instance,user=instance.sent_by,accepted_by=instance.recieved_by)
#             print("Request accepted",instance,instance.sent_by,instance.recieved_by )
#             conversation = Conversation.objects.create(last_message_datetime=datetime.now())
#             conversation.includes.add(instance.sent_by.id,instance.recieved_by.id)