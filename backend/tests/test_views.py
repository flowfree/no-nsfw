import os 

import pytest
from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile

from app.models import Photo
from .conftest import generate_image


def test_home(client):
    response = client.get('/')

    assert response.status_code == 200
    assert response.json() == {'message': 'Photos API is available at /photos'}


@pytest.mark.django_db
def test_list_photos(client, sample_photos):
    response = client.get('/photos')

    assert response.status_code == 200
    r = response.json()
    assert r[2]['id'] == sample_photos[0].id
    assert r[1]['id'] == sample_photos[1].id
    assert r[0]['id'] == sample_photos[2].id


@pytest.mark.django_db
def test_create_new_photo(client):
    numrows = Photo.objects.count() 

    with generate_image('test.png') as fp:
        response = client.post('/photos', {
            'title': 'Test photo',
            'description': 'Test description',
            'image': SimpleUploadedFile(
                'sample.png',
                fp.read(),
                content_type='image/png'
            )
        })

    assert response.status_code == 201
    assert Photo.objects.count() == numrows+1

    Photo.objects.last().delete()


@pytest.mark.django_db
def test_create_new_photo_with_invalid_image(client):
    numrows = Photo.objects.count()

    with open(__file__, 'rb') as fp:
        response = client.post('/photos', {
            'title': 'aaa',
            'description': 'bbb',
            'image': SimpleUploadedFile(
                'sample.jpg',
                fp.read(),
                content_type='image/jpeg'
            )
        })

    assert response.status_code == 400
    assert response.json() == {
        'image': ['Upload a valid image. The file you uploaded was ' \
                  'either not an image or a corrupted image.']
    }


@pytest.mark.django_db
def test_delete_photo(client, sample_photos):
    response = client.delete(f'/photos/{sample_photos[0].id}')

    assert response.status_code == 204
    assert Photo.objects.count() == len(sample_photos)-1


@pytest.mark.django_db
def test_detect_nsfw_uploads(client):
    sample_image = settings.BASE_DIR / 'tests/images/sample-porn.jpg'
    if not os.path.isfile(sample_image):
        assert 1
        return

    with open(sample_image, 'rb') as fp:
        response = client.post('/photos', {
            'title': 'aaa',
            'description': 'bbb',
            'image': SimpleUploadedFile(
                'sample.jpg',
                fp.read(),
                content_type='image/jpeg'
            )
        })

    assert response.status_code == 400
    assert response.json() == {'non_field_errors': ['NSFW images are not allowed.']}
