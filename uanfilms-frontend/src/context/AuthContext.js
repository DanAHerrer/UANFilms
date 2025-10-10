
import React, { createContext, useState, useContext } from 'react';
import apiClient from '../api/axios';
import { jwtDecode } from 'jwt-decode'; // Necesitarás instalar jwt-decode: npm install jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwtDecode(localStorage.getItem('authToken')) : null);

  const login = async (username, password) => {
    const response = await apiClient.post('/login/', { username, password });
    const { access, refresh } = response.data;
    
    localStorage.setItem('authToken', access);
    localStorage.setItem('refreshToken', refresh);
    
    setAuthToken(access);
    setUser(jwtDecode(access));
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
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};