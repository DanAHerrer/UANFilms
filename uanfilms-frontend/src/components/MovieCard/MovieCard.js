// src/components/MovieCard/MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
 
  const placeholderImage = "https://placehold.co/800?text=UANFilms&font=roboto";

  return (
    <div className="movie-card">
     
      <img 
        src={movie.portada || placeholderImage} 
        alt={`Portada de ${movie.titulo}`} 
        className="movie-card-img"
      />
   

      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.titulo} ({movie.ano_lanzamiento})</h3>
        <p className="movie-card-director">Director: {movie.director}</p>
        
        <Link to={`/pelicula/${movie.id}`} className="movie-card-details">
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;