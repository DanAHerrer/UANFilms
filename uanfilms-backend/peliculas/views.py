
from rest_framework import viewsets, permissions
from .models import Pelicula, Resena
from .serializers import PeliculaSerializer, ResenaSerializer
from django.db.models import Q # Para búsquedas complejas
from rest_framework.decorators import action
from rest_framework.response import Response

class PeliculaViewSet(viewsets.ModelViewSet):
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer
    
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    
    @action(detail=False, methods=['get'])
    def buscar(self, request):
        query = request.query_params.get('q', None)
        if query is not None:
            
            peliculas = self.queryset.filter(
                Q(titulo__icontains=query) |
                Q(director__icontains=query) |
                Q(genero__icontains=query) |
                Q(ano_lanzamiento__iexact=query)
            )
            serializer = self.get_serializer(peliculas, many=True)
            return Response(serializer.data)
        return Response({"detail": "Debes proporcionar un parámetro de búsqueda 'q'."}, status=400)

class ResenaViewSet(viewsets.ModelViewSet):
    queryset = Resena.objects.all()
    serializer_class = ResenaSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def get_queryset(self):
        
        return Resena.objects.filter(pelicula=self.kwargs['pelicula_pk'])

    def perform_create(self, serializer):
        pelicula = Pelicula.objects.get(pk=self.kwargs['pelicula_pk'])
        serializer.save(usuario=self.request.user, pelicula=pelicula)