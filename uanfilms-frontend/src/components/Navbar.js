import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">UANFilms</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">Hola, {user.username}</span>
            <Link to="/agregar-pelicula">Añadir Película</Link>
            <button onClick={logout} className="logout-button">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;