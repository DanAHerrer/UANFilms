import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormCard from '../components/FormCard'; 

const RegisterPage = () => {
 
  const { register } = useAuth();
  const navigate = useNavigate();


  const handleRegister = async (formData) => {
    try {
   
      await register(formData.username, formData.email, formData.password);
      
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Hubo un error en el registro. El usuario o email podría ya existir.');
    }
  };

  return (
  
    <FormCard
      title="Crear una Cuenta"
      fields={[
        { name: 'username', type: 'text', label: 'Nombre de usuario', required: true },
        { name: 'email', type: 'email', label: 'Correo electrónico', required: true },
        { name: 'password', type: 'password', label: 'Contraseña', required: true }
      ]}
      buttonText="Registrarse"
      onSubmit={handleRegister} 
    />
  );
};

export default RegisterPage;