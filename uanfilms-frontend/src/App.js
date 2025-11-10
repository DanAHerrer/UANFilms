
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import MovieDetailPage from './pages/MovieDetailPage'; 
import MovieFormPage from './pages/MovieFormPage'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
       
        <div className="app-container">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pelicula/:id" element={<MovieDetailPage />} />

            {/* Rutas Privadas */}
            <Route element={<PrivateRoute />}>
              <Route path="/agregar-pelicula" element={<MovieFormPage />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

