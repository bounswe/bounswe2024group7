from django.apps import AppConfig


class ArtifactappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'artifactapp'

    def ready(self):
        from . import signals
