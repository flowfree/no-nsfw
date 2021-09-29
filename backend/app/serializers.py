from rest_framework import serializers
from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'title', 'description', 'image']

    def validate_image(self, image):
        if image.size > 1048576:
            raise serializers.ValidationError('Max size is 1MB.')
        return image
