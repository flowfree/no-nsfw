import io
import os

from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import pytest

from app.models import Photo

def generate_image(filename):
    file = io.BytesIO()
    image = Image.new('RGBA', size=(10, 10), color=(0, 0, 0))
    image.save(file, 'png')
    file.name = filename
    file.seek(0)
    return file


@pytest.fixture
def sample_photos():
    photos = []
    for filename in ['a.png', 'b.png', 'c.png']:
        with generate_image(filename) as fp:
            photo = Photo.objects.create(
                title=f'Sample photo {filename}',
                description='Sample description',
                image=SimpleUploadedFile(name=filename, content=fp.read())
            )
            photos.append(photo)

    yield photos

    for photo in photos:
        photo.delete()