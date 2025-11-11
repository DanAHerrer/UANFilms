import React, { useState } from 'react';
import './FormCard.css';

const FormCard = ({ title, description, fields, buttonText, onSubmit }) => {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = field.type === 'file' ? null : '';
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    setFormData(prevData => ({ ...prevData, [name]: newValue }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    
    const newErrors = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} es obligatorio.`;
      }
      if (field.type === 'email' && formData[field.name] && !/\S+@\S+\.\S+/.test(formData[field.name])) {
        newErrors[field.name] = 'El formato del correo no es válido.';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

     
      const hasFileField = fields.some(field => field.type === 'file');
      
      let dataToSend;

      if (hasFileField) {
        
        dataToSend = new FormData();
        for (const key in formData) {
          if (formData[key] !== null) {
            dataToSend.append(key, formData[key]);
          }
        }
      } else {
        
        dataToSend = { ...formData };
      }

      try {
        await onSubmit(dataToSend);
      } catch (error) {
        console.error("Error durante el onSubmit:", error);
      } finally {
        setIsLoading(false); 
      }
    }
  };

  
  const renderField = (field) => {
    
    const { name, type, required, options, accept } = field;
    const hasError = !!errors[name]; 
    const inputClassName = `form-input ${hasError ? 'input-error' : ''}`;

    switch (type) {
      case 'textarea':
        return <textarea id={name} name={name} value={formData[name]} onChange={handleChange} required={required} className={inputClassName} rows="4" />;
      case 'select':
        return (
          <select id={name} name={name} value={formData[name]} onChange={handleChange} required={required} className={inputClassName}>
            {options.map(opt => {
              const value = typeof opt === 'object' ? opt.value : opt;
              const label = typeof opt === 'object' ? opt.label : opt;
              return <option key={value} value={value}>{label}</option>;
            })}
          </select>
        );
      case 'file':
        return <input id={name} name={name} type="file" onChange={handleChange} required={required} className={inputClassName} accept={accept} />;
      default:
        return <input id={name} name={name} type={type} value={formData[name]} onChange={handleChange} required={required} className={inputClassName} />;
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title">{title}</h2>
      {description && <p className="form-description">{description}</p>}
      <form onSubmit={handleSubmit} className="form-content" noValidate>
        <div className="form-fields-container">
          {fields.map(field => (
            <div key={field.name} className="form-field">
              <label htmlFor={field.name} className="form-label">{field.label}</label>
              {renderField(field)}
              {errors[field.name] && <span className="error-message">{errors[field.name]}</span>}
            </div>
          ))}
        </div>
        <button type="submit" className="form-submit-button" disabled={isLoading}>
          {isLoading ? 'Enviando...' : buttonText}
        </button>
      </form>
    </div>
  );
};

export default FormCard;