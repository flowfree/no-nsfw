from django.db import models
from django.dispatch import receiver


class Photo(models.Model):
    title = models.CharField(max_length=100)
    tags = models.CharField(max_length=150)
    image = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


@receiver(models.signals.post_delete, sender=Photo)
def auto_delete_image_on_delete(sender, instance, **kwargs):
    if instance.image:
        try:
            instance.image.delete(save=False)
        except Exception:
            pass
