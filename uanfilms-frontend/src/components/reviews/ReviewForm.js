import React, { useState } from 'react';

const ReviewForm = ({ peliculaId, onReviewSubmitted }) => {
  const [textoResena, setTextoResena] = useState('');
  const [calificacion, setCalificacion] = useState('5'); // Calificación por defecto

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!textoResena.trim()) {
      alert('Por favor, escribe tu reseña.');
      return;
    }

    // Llamamos a la función que nos pasaron como prop para manejar la lógica de la API
    await onReviewSubmitted({
      texto_resena: textoResena,
      calificacion: parseInt(calificacion, 10),
    });

    // Limpiamos el formulario después de enviarlo
    setTextoResena('');
    setCalificacion('5');
  };

  return (
    <div className="review-form-container">
      <h4>Escribe tu reseña</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="calificacion">Calificación:</label>
          <select
            id="calificacion"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
          >
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="textoResena">Reseña:</label>
          <textarea
            id="textoResena"
            rows="4"
            value={textoResena}
            onChange={(e) => setTextoResena(e.target.value)}
            placeholder="¿Qué te pareció la película?"
            required
          ></textarea>
        </div>
        <button type="submit">Enviar Reseña</button>
      </form>
    </div>
  );
};

export default ReviewForm;