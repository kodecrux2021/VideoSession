from notification.models import Request

@receiver(post_save, sender=Hire, dispatch_uid="update_stock_count")
def update_request(sender, instance, **kwargs):
    print("Request not accepted",instance,instance.sent_by,instance.recieved_by )    
    print("Request accepted",instance,instance.sent_by,instance.recieved_by )
    if not Request.objects.filter(type="HIRE",contract=hire, 
    	user=instance.sent_by,accepted_by=instance.recieved_by).exists():
        Notification.objects.create(request=instance,user=instance.sent_by,accepted_by=instance.recieved_by)
        print("Request accepted",instance,instance.sent_by,instance.recieved_by )
        conversation = Conversation.objects.create(last_message_datetime=datetime.now())
        conversation.includes.add(instance.sent_by.id,instance.recieved_by.id)
    # if instance.accepted:
