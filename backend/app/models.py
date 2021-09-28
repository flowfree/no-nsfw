from django.db import models


class Photo(models.Model):
    title = models.CharField(max_length=100)
    tags = models.CharField(max_length=150)
    image = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
