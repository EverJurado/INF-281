// src/pages/Eventos.jsx
import React, { useEffect, useState } from 'react';
import FiltrosEventos from '../components/eventos/FiltrosEventos';
import ListaEventos from '../components/eventos/ListaEventos';
import MapaEventos from '../components/eventos/MapaEventos';
import '../styles/eventos.css';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [filtros, setFiltros] = useState({ fecha: '', modalidad: '', tipo: '', precio: '' });

  useEffect(() => {
    fetchEventos();
  }, [filtros]);

  const fetchEventos = async () => {
    try {
      const query = new URLSearchParams(filtros).toString();
      const res = await fetch(`/api/eventos?${query}`);
      const data = await res.json();
      setEventos(data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
    }
  };

  return (
    <div className="eventos-container">
      <div className="filtros">
        <FiltrosEventos setFiltros={setFiltros} />
      </div>
      <div className="lista-eventos">
        <ListaEventos eventos={eventos} />
      </div>
      <div className="mapa">
        <MapaEventos eventos={eventos} />
      </div>
    </div>
  );
};

export default Eventos;
