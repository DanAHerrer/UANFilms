from django.db import models
from usuarios.models import Usuario 
class Pelicula(models.Model):
    titulo = models.CharField(max_length=255)
    sinopsis = models.TextField()
    ano_lanzamiento = models.IntegerField()
    director = models.CharField(max_length=150)
    genero = models.CharField(max_length=100)
    elenco = models.TextField()
    codigo_hash = models.CharField(max_length=64, unique=True, editable=False) # Usamos SHA256, no es editable por el usuario
    
    def __str__(self):
        return self.titulo

class Resena(models.Model):
    pelicula = models.ForeignKey(Pelicula, related_name='resenas', on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    calificacion = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)]) # Calificación de 1 a 5
    texto_resena = models.TextField()
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        
        unique_together = ('pelicula', 'usuario')

    def __str__(self):
        return f'{self.calificacion} estrellas para {self.pelicula.titulo} por {self.usuario.username}'