import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../api/axios';
import { useAuth } from '../context/AuthContext'; // Para saber si el usuario está logueado
import ReviewForm from '../components/reviews/ReviewForm'; // <-- Importamos nuestro nuevo componente

const MovieDetailPage = () => {
  const { id } = useParams(); // Obtiene el ID de la película de la URL
  const { user } = useAuth(); // Obtenemos el estado del usuario
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/peliculas/${id}/`);
        setMovie(response.data);
      } catch (err) {
        setError('No se pudo cargar la información de la película.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // FUNCIÓN PARA MANEJAR EL ENVÍO DE LA RESEÑA
  const handleReviewSubmit = async (reviewData) => {
    try {
      // Hacemos la petición POST al endpoint de reseñas de la película actual
      const response = await apiClient.post(`/peliculas/${id}/resenas/`, reviewData);
      
      // Actualizamos el estado para mostrar la nueva reseña instantáneamente
      const newReview = response.data;
      setMovie(prevMovie => ({
        ...prevMovie,
        resenas: [...prevMovie.resenas, newReview]
      }));

    } catch (err) {
      console.error('Error al enviar la reseña:', err.response.data);
      alert('Error al enviar la reseña. ¿Quizás ya has reseñado esta película?');
    }
  };


  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!movie) return <p>Película no encontrada.</p>;

  return (
    <div className="movie-detail-container">
      <h1>{movie.titulo} ({movie.ano_lanzamiento})</h1>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Género:</strong> {movie.genero}</p>
      <p><strong>Elenco:</strong> {movie.elenco}</p>
      <h4>Sinopsis</h4>
      <p>{movie.sinopsis}</p>

      <hr />

      <div className="reviews-section">
        <h3>Reseñas</h3>
        {movie.resenas && movie.resenas.length > 0 ? (
          movie.resenas.map(resena => (
            <div key={resena.id} className="review-card">
              <p><strong>{resena.usuario}</strong> - Calificación: {'★'.repeat(resena.calificacion)}</p>
              <p>{resena.texto_resena}</p>
            </div>
          ))
        ) : (
          <p>Esta película aún no tiene reseñas. ¡Sé el primero!</p>
        )}
      </div>

      <hr />

      {/* RENDERIZADO CONDICIONAL DEL FORMULARIO */}
      {user ? (
        <ReviewForm peliculaId={id} onReviewSubmitted={handleReviewSubmit} />
      ) : (
        <p>
          <Link to="/login">Inicia sesión</Link> para dejar una reseña.
        </p>
      )}
    </div>
  );
};

export default MovieDetailPage;