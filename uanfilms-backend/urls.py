
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from usuarios.views import RegistroView
from usuarios.views import RegistroView, MyTokenObtainPairView 
from rest_framework_simplejwt.views import TokenRefreshView

def api_root_redirect(request):
    
    return redirect('/api/peliculas/') 

urlpatterns = [
    
    path('', api_root_redirect), 

    path('admin/', admin.site.urls),

    
    path('api/register/', RegistroView.as_view(), name='register'),
    path('api/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/', include('peliculas.urls')),
]