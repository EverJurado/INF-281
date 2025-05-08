// src/pages/CrearEvento.jsx
import React from 'react';
import FormularioEvento from '../components/crearEvento/FormularioEvento';
import '../styles/crearEvento.css';

const CrearEvento = () => {
  return (
    <div className="crear-evento-page">
      <h2>Crear Nuevo Evento</h2>
      <FormularioEvento />
    </div>
  );
};

export default CrearEvento;
