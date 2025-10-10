import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const response = await apiClient.get('/peliculas/');
        setPeliculas(response.data);
      } catch (error) {
        console.error('Error al cargar las películas', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPeliculas();
  }, []);

  if (loading) return <p>Cargando películas...</p>;

  return (
    <div>
      <h1>Catálogo de Películas</h1>
      <Link to="/agregar-pelicula">Añadir Nueva Película</Link>
      <div className="movie-list">
        {peliculas.map(pelicula => (
          <div key={pelicula.id} className="movie-card">
            <h2>{pelicula.titulo} ({pelicula.ano_lanzamiento})</h2>
            <p>Director: {pelicula.director}</p>
            <Link to={`/pelicula/${pelicula.id}`}>Ver detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;