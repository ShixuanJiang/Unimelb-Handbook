from django.apps import AppConfig


class TimejobConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.timejob'

    def ready(self):
        import apps.timejob.signals
