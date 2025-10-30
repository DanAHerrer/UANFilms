from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegistroSerializer
from rest_framework.permissions import AllowAny

class RegistroView(APIView):
    permission_classes = [AllowAny] # Cualquiera puede registrarse

    def post(self, request):
        serializer = RegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)