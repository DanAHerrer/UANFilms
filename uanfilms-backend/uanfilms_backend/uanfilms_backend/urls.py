
from django.contrib import admin
from django.urls import path, include
from usuarios.views import RegistroView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Endpoints de Autenticación
    path('api/register/', RegistroView.as_view(), name='register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Renovar token

    # Endpoints de Películas y Reseñas
    path('api/', include('peliculas.urls')),
]