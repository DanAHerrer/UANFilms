
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook para leer parámetros de la URL
import apiClient from '../api/axios';

const MovieDetailPage = () => {
  const { id } = useParams(); // Obtenemos el 'id' de la URL (ej. /pelicula/5)
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/peliculas/${id}/`);
        setPelicula(response.data);
      } catch (error) {
        console.error(`Error al obtener la película ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchPelicula();
  }, [id]); // Se ejecuta cada vez que el 'id' de la URL cambie

  if (loading) {
    return <p>Cargando detalles de la película...</p>;
  }

  if (!pelicula) {
    return <p>Película no encontrada.</p>;
  }

  return (
    <div>
      <h1>{pelicula.titulo}</h1>
      <p><strong>Año:</strong> {pelicula.ano_lanzamiento}</p>
      <p><strong>Director:</strong> {pelicula.director}</p>
      <p><strong>Género:</strong> {pelicula.genero}</p>
      <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
      <p><strong>Elenco:</strong> {pelicula.elenco}</p>
      
      {/* Aquí es donde mostraremos las reseñas en el futuro */}
      <hr />
      <h2>Reseñas</h2>
      {/* Lógica para mostrar las reseñas de pelicula.resenas */}
    </div>
  );
};

export default MovieDetailPage;