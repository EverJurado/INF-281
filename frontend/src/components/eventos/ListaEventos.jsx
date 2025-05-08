// src/components/eventos/ListaEventos.jsx
import React from 'react';
import EventoCard from './EventoCard';
import './ListaEventos.css';

const ListaEventos = ({ eventos }) => {
  const handleLike = async (id_evento) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/agenda/${id_evento}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ actividad: 'Like agregado' })
      });
    } catch (err) {
      console.error('Error al dar like:', err);
    }
  };

  return (
    <div className="lista-eventos-vertical">
      {eventos.length === 0 ? (
        <p>No hay eventos disponibles.</p>
      ) : (
        eventos.map(evento => (
          <EventoCard key={evento.id_evento} evento={evento} onLike={handleLike} />
        ))
      )}
    </div>
  );
};

export default ListaEventos;
