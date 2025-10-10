from django.urls import path, include
from rest_framework_nested import routers
from .views import PeliculaViewSet, ResenaViewSet


router = routers.DefaultRouter()
router.register(r'peliculas', PeliculaViewSet, basename='pelicula')


resenas_router = routers.NestedDefaultRouter(router, r'peliculas', lookup='pelicula')
resenas_router.register(r'resenas', ResenaViewSet, basename='pelicula-resenas')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(resenas_router.urls)),
]