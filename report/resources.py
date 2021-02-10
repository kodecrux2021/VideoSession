from import_export import resources
from .models import Report

class PersonResource(resources.ModelResource):
    class Meta:
        model = Report