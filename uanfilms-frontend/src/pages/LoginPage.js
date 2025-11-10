import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormCard from '../components/FormCard'; 

const LoginPage = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

 
  const handleLogin = async (formData) => {
    try {
     
      await login(formData.username, formData.password);
      navigate('/'); 
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Credenciales incorrectas.');
    }
  };

  return (
    
    <FormCard
      title="Iniciar Sesión"
      fields={[
        { name: 'username', type: 'text', label: 'Usuario', required: true },
        { name: 'password', type: 'password', label: 'Contraseña', required: true }
      ]}
      buttonText="Entrar"
      onSubmit={handleLogin} 
    />
  );
};

export default LoginPage;