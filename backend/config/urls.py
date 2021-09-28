from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.routers import SimpleRouter
from app.views import PhotoViewSet


@api_view(['GET'])
def home(request):
    return Response({
        'message': 'Photos API is available at /photos'
    })


urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
]

router = SimpleRouter(trailing_slash=False)
router.register('photos', PhotoViewSet)
urlpatterns += router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
