from .models import Technology,Subtechnology,Topic
from django.contrib import admin
from django.contrib import messages


# Register your models here.

# admin.site.register(Technology),
# admin.site.register(Subtechnology),
# admin.site.register(Topic),

@admin.register(Technology)
class SampleAdminModel(admin.ModelAdmin):
    fieldsets =(
            ('Required information',{
                'description' : 'These fields are compulsory',
                'fields':(('name'),)
            }),
    )
    list_display =('name',)
    list_filter = ('name',)
    ordering =('name',)

@admin.register(Subtechnology)
class SampleAdminModel(admin.ModelAdmin):
    fieldsets =(
            ('Required information',{
                'description' : 'These fields are compulsory',
                'fields':(('name','technology'),)
            }),
    )
    list_display =('name','technology',)
    list_filter = ('technology',)
    ordering =('name',)

@admin.register(Topic)
class SampleAdminModel(admin.ModelAdmin):
    search_fields = ['name']
    fieldsets =(
            ('Required information',{
                'description' : 'These fields are compulsory',
                'fields':(('name','sub_technology'),)
            }),
    )
    list_display =('name','sub_technology','active')
    list_filter = ('sub_technology',)
    ordering =('name',)
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