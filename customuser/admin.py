from .models import CustomUser
from django.contrib import admin
from django.contrib import messages

# Register your models here.

# admin.site.register(CustomUser),

@admin.register(CustomUser)
class SampleAdminModel(admin.ModelAdmin):
    fieldsets =(
            ('Required information',{
                'description' : 'These fields are compulsory',
                'fields':(('username','pincode','state','city','otp','password','email','first_name','last_name','phone','is_instructor','is_freelancer','is_codeexpert','is_client','technology','sub_technology','topic','last_seen','profile_pic','total_experience','relevant_experience','date_of_birth'),)
            }),
    )
    list_display =('id','username','email')
    list_filter = ('email',)
    ordering =('email',)
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