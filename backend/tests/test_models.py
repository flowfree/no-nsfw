import os 

import pytest 
from django.core.files.uploadedfile import SimpleUploadedFile

from app.models import Photo
from .conftest import generate_image


@pytest.mark.django_db
def test_autoremove_image():
    numrows = Photo.objects.count() 

    with generate_image('test.png') as fp:
        photo = Photo.objects.create(
            title=f'Sample photo',
            tags='a, b, c',
            image=SimpleUploadedFile(name='test.png', content=fp.read())
        )

    image_path = photo.image.path

    assert Photo.objects.count() == numrows+1
    assert os.path.isfile(image_path)

    photo.delete()

    assert Photo.objects.count() == numrows
    assert os.path.isfile(image_path) == False
