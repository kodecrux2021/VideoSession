from django.apps import AppConfig
import hire

class HireConfig(AppConfig):
    name = 'hire'
    def ready(self):
        import hire.signals