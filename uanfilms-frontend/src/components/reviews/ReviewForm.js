import React from 'react';
import FormCard from '../FormCard';

const ReviewForm = ({ onReviewSubmitted }) => {
  
  const handleReviewSubmit = async (formData) => {
    await onReviewSubmitted({
      texto_resena: formData.texto_resena,
      calificacion: parseInt(formData.calificacion, 10),
    });
  };

  return (
    <FormCard
      title="Escribe tu reseña"
      fields={[
        { 
          name: 'calificacion', 
          type: 'select', 
          label: 'Calificación', 
          required: true,
          
          options: [
            { value: '5', label: '★★★★★' },
            { value: '4', label: '★★★★☆' },
            { value: '3', label: '★★★☆☆' },
            { value: '2', label: '★★☆☆☆' },
            { value: '1', label: '★☆☆☆☆' }
          ]
        },
        { 
          name: 'texto_resena', 
          type: 'textarea', 
          label: 'Reseña', 
          required: true 
        }
      ]}
      buttonText="Enviar Reseña"
      onSubmit={handleReviewSubmit}
    />
  );
};

export default ReviewForm;