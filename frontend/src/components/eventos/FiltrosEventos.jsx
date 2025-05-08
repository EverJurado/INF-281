// src/components/eventos/FiltrosEventos.jsx
import React from 'react';
import './FiltrosEventos.css';

const FiltrosEventos = ({ setFiltros }) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filtros-eventos">
      <h3>Filtrar Eventos</h3>

      <label>Fecha</label>
      <select name="fecha" onChange={manejarCambio}>
        <option value="">Todas</option>
        <option value="hoy">Hoy</option>
        <option value="manana">Mañana</option>
        <option value="semana">Esta semana</option>
        <option value="mes">Este mes</option>
        <option value="fecha">Elegir fecha</option>
      </select>

      <label>Precio</label>
      <select name="precio" onChange={manejarCambio}>
        <option value="">Todos</option>
        <option value="gratis">Gratis</option>
        <option value="pago">Pagado</option>
      </select>

      <label>Modalidad</label>
      <select name="modalidad" onChange={manejarCambio}>
        <option value="">Todas</option>
        <option value="virtual">Virtual</option>
        <option value="presencial">Presencial</option>
        <option value="mixto">Mixto</option>
      </select>

      <label>Tipo</label>
      <select name="tipo" onChange={manejarCambio}>
        <option value="">Todos</option>
        <option value="historia">Historia</option>
        <option value="cultura">Cultura</option>
        <option value="arte">Arte</option>
        <option value="educativo">Educativo</option>
      </select>
    </div>
  );
};

export default FiltrosEventos;
