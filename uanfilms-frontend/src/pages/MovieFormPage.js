
import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import FormCard from '../components/FormCard'; 

const MovieFormPage = () => {
  
  const navigate = useNavigate();

  const handleAddMovie = async (formData) => {
    try {
    
      const response = await apiClient.post('/peliculas/', formData);
      alert('¡Película agregada con éxito!');
      navigate(`/pelicula/${response.data.id}`);
    } catch (error) {
      console.error('Error al agregar la película:', error);
      alert('Hubo un error al agregar la película.');
    }
  };

  return (
   
    <FormCard
      title="Añadir Nueva Película"
      fields={[
        { name: 'titulo', type: 'text', label: 'Título', required: true },
        { name: 'sinopsis', type: 'textarea', label: 'Sinopsis', required: true },
        { name: 'ano_lanzamiento', type: 'number', label: 'Año de Lanzamiento', required: true },
        { name: 'director', type: 'text', label: 'Director', required: true },
        { name: 'genero', type: 'text', label: 'Género', required: true },
        { name: 'elenco', type: 'textarea', label: 'Elenco (separado por comas)', required: true }
      ]}
      buttonText="Guardar Película"
      onSubmit={handleAddMovie} 
    />
  );
};

export default MovieFormPage;
