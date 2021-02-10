from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import Report

class ReportResource(resources.ModelResource):

    class Meta:
        model = Report

class ReportAdmin(ImportExportModelAdmin):
    resource_class = ReportResource

admin.site.register(Report, ReportAdmin)

