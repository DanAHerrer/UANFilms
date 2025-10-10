import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';

const MovieFormPage = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    sinopsis: '',
    ano_lanzamiento: '',
    director: '',
    genero: '',
    elenco: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await apiClient.post('/peliculas/', formData);
      alert('¡Película agregada con éxito!');
      // Redirigimos al usuario a la página de detalle de la nueva película
      navigate(`/pelicula/${response.data.id}`);
    } catch (error) {
      console.error('Error al agregar la película:', error);
      alert('Hubo un error al agregar la película.');
    }
  };

  return (
    <div>
      <h1>Añadir Nueva Película</h1>
      <form onSubmit={handleSubmit}>
        {/* Aquí irían los inputs para cada campo del formulario */}
        <input name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Título" required />
        <textarea name="sinopsis" value={formData.sinopsis} onChange={handleChange} placeholder="Sinopsis" required />
        <input type="number" name="ano_lanzamiento" value={formData.ano_lanzamiento} onChange={handleChange} placeholder="Año de Lanzamiento" required />
        <input name="director" value={formData.director} onChange={handleChange} placeholder="Director" required />
        <input name="genero" value={formData.genero} onChange={handleChange} placeholder="Género" required />
        <textarea name="elenco" value={formData.elenco} onChange={handleChange} placeholder="Elenco" required />
        <button type="submit">Guardar Película</button>
      </form>
    </div>
  );
};

export default MovieFormPage;