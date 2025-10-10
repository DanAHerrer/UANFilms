import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../api/axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authToken) {
      // Si hay un token, lo decodificamos y lo guardamos en el estado 'user'
      setUser(jwtDecode(authToken));
    } else {
      // Si no hay token, nos aseguramos de que el usuario sea null
      setUser(null);
    }
    // Ya terminamos de verificar el token al cargar, quitamos el estado de carga
    setLoading(false);

  }, [authToken]); 

  const login = async (username, password) => {
    const response = await apiClient.post('/login/', { username, password });
    const { access, refresh } = response.data;
    
    localStorage.setItem('authToken', access);
    localStorage.setItem('refreshToken', refresh);
    
    setAuthToken(access);
    setUser(jwtDecode(access));
  };
  const register = async (username, email, password) => {
   
    const response = await apiClient.post('/register/', {
      username,
      email,
      password,
    });
   
    return response.data;
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setAuthToken(null);
    setUser(null);
  };
  
  const contextData = {
    user,
    login,
    register,
    logout,
  };

   return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Cargando aplicación...</p> : children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};