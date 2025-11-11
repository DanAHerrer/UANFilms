import hashlib
from rest_framework import serializers
from .models import Pelicula, Resena
from usuarios.models import Usuario



class ResenaSerializer(serializers.ModelSerializer):
    usuario = serializers.ReadOnlyField(source='usuario.username')

    class Meta:
        model = Resena
        fields = ['id', 'pelicula', 'usuario', 'calificacion', 'texto_resena', 'creado_en']
        read_only_fields = ('usuario', 'pelicula') 

class PeliculaSerializer(serializers.ModelSerializer):
    
    resenas = ResenaSerializer(many=True, read_only=True)

    class Meta:
        model = Pelicula
        fields = ['id', 'titulo', 'sinopsis', 'ano_lanzamiento', 'director', 'genero', 'elenco', 'portada', 'codigo_hash', 'resenas']
        read_only_fields = ('codigo_hash',) 

    def create(self, validated_data):
        
        titulo_str = validated_data['titulo'].lower().replace(' ', '')
        ano_str = str(validated_data['ano_lanzamiento'])
        
        hash_input = (titulo_str + ano_str).encode('utf-8')
        codigo_hash = hashlib.sha256(hash_input).hexdigest()

        if Pelicula.objects.filter(codigo_hash=codigo_hash).exists():
            raise serializers.ValidationError("Esta película ya fue registrada.")
        
        validated_data['codigo_hash'] = codigo_hash
        return super().create(validated_data)