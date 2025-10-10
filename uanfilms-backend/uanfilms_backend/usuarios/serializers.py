from rest_framework import serializers
from .models import Usuario

class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Usuario
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        
        usuario = Usuario.ojects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return usuario