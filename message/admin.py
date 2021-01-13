from .models import Message,Conversation
from django.contrib import admin
from django.contrib import messages


# Register your models here.

# admin.site.register(Technology),
# admin.site.register(Subtechnology),
# admin.site.register(Topic),

@admin.register(Conversation)
class SampleAdminModel(admin.ModelAdmin):
    fieldsets =(
            ('Required information',{
                'description' : 'These fields are compulsory',
                'fields':(('includes'),)
            }),
    )
    list_display =('id',)
    list_filter = ('includes',)
    ordering =('includes',)
    def active(self, obj):
        return obj.is_active == 1

    active.boolean = True

    def make_active(modeladmin, request, queryset):
        queryset.update(is_active=1)
        messages.success(request, "Selected Record(s) Marked as Active Successfully !!")

    def make_inactive(modeladmin, request, queryset):
        queryset.update(is_active=0)
        messages.success(request, "Selected Record(s) Marked as Inactive Successfully !!")

    admin.site.add_action(make_active, "Make Active")
    admin.site.add_action(make_inactive, "Make Inactive")

@admin.register(Message)
class SampleAdminModel(admin.ModelAdmin):
    fieldsets =(
            ('Required information',{
                'description' : 'These fields are compulsory',
                'fields':(('sent_by','read_by',),)
            }),
    )
    list_display =('date','message','is_read','attachment','conversation')
    list_filter = ('sent_by',)
    ordering =('sent_by',)
    def active(self, obj):
        return obj.is_active == 1

    active.boolean = True

    def make_active(modeladmin, request, queryset):
        queryset.update(is_active=1)
        messages.success(request, "Selected Record(s) Marked as Active Successfully !!")

    def make_inactive(modeladmin, request, queryset):
        queryset.update(is_active=0)
        messages.success(request, "Selected Record(s) Marked as Inactive Successfully !!")

    admin.site.add_action(make_active, "Make Active")
    admin.site.add_action(make_inactive, "Make Inactive")

