import io
import os

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image

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
                tags='a, b, c',
                image=SimpleUploadedFile(name=filename, content=fp.read())
            )
            photos.append(photo)

    yield photos

    for photo in photos:
        photo.delete()


def test_home(client):
    response = client.get('/')

    assert response.status_code == 200
    assert response.json() == {'message': 'Photos API is available at /photos'}


@pytest.mark.django_db
def test_list_photos(client, sample_photos):
    response = client.get('/photos')

    assert response.status_code == 200
    r = response.json()
    assert r[0]['id'] == sample_photos[0].id
    assert r[1]['id'] == sample_photos[1].id
    assert r[2]['id'] == sample_photos[2].id


@pytest.mark.django_db
def test_create_new_photo(client):
    numrows = Photo.objects.count() 

    with generate_image('test.png') as fp:
        response = client.post('/photos', {
            'title': 'Test photo',
            'tags': 'a, b, c',
            'image': SimpleUploadedFile(
                'sample.jpg',
                fp.read(),
                content_type='image/png'
            )
        })

    assert response.status_code == 201
    assert Photo.objects.count() == numrows+1

    Photo.objects.last().delete()


@pytest.mark.django_db
def test_delete_photo(client, sample_photos):
    photo = sample_photos[0]

    response = client.delete(f'/photos/{photo.id}')

    assert response.status_code == 204
    assert Photo.objects.count() == len(sample_photos)-1
    assert os.path.isfile(photo.image.path) == False
