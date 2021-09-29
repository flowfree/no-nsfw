import numpy as np
import cv2
import tensorflow as tf
import tensorflow_hub as hub
from django.conf import settings
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

    def validate(self, data):
        fp = data['image']
        arr = np.fromstring(fp.read(), np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_UNCHANGED)
        height, width, _ = img.shape
        if height >= 100 and width >= 100:
            img = cv2.resize(img, (224, 224))
            img = img / 255.
            model = tf.keras.models.load_model(
                settings.BASE_DIR / 'app/nsfw_model.h5', 
                custom_objects={'KerasLayer': hub.KerasLayer}
            )
            categories = ['drawings', 'hentai', 'neutral', 'porn', 'sexy']
            probs = model.predict(img.reshape(1, 224, 224, 3))
            predicts = list(zip(categories, probs[0]))
            predicts = [p[0] for p in predicts if p[1] >= .5]

            if 'porn' in predicts or 'sexy' in predicts or 'hentai' in predicts:
                raise serializers.ValidationError('NSFW images are not allowed.')

        return data
