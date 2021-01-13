from django.db import models
from customuser.models import CustomUser
from datetime import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver


REQUEST_CHOICES = (
    ('MESSAGE','MESSAGE'),
    ('HIRE', 'HIRE'),
)

class Request(models.Model):
    sent_by = models.ForeignKey(CustomUser,related_name="sent_by_notification", on_delete=models.CASCADE,null=True,blank=True)
    recieved_by = models.ForeignKey(CustomUser,related_name="recieved_by_notification", on_delete=models.CASCADE,null=True,blank=True)
    datetime =  models.DateTimeField(default=datetime.now(),null=True, blank=True)
    accepted = models.BooleanField(default=False)
    type = models.CharField(max_length=100, choices=REQUEST_CHOICES, null=True, blank=True)


    def __str__(self):
        """String for representing the Model object."""
        return str(self.recieved_by)

@receiver(post_save, sender=Request, dispatch_uid="update_stock_count")
def update_request(sender, instance, **kwargs):
    if instance.accepted:
        Notification.objects.create(request=instance,user=instance.recieved_by)





class Notification(models.Model):
    request = models.ForeignKey(Request,related_name="notification_request", on_delete=models.CASCADE,null=True,blank=True)
    user = models.ForeignKey(CustomUser,related_name="users_notification", on_delete=models.CASCADE,null=True,blank=True)
    seen_by =   models.BooleanField(default=False,null=True, blank=True)
    created_at =  models.DateTimeField(default=datetime.now(),null=True, blank=True)


    def __str__(self):
        """String for representing the Model object."""
        return str(self.users)