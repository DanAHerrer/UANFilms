
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/axios'; 
import MovieCard from '../components/MovieCard/MovieCard.js';
import './HomePage.css'; 

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
      
      <div className="page-header">
        <h1>Catálogo de Películas</h1>
      
        <Link to="/agregar-pelicula" className="add-movie-link">Añadir Nueva Película</Link>
      </div>
      
  
      <div className="movie-grid">
        {peliculas.map(pelicula => (
          
          <MovieCard key={pelicula.id} movie={pelicula} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;