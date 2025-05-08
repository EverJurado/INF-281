// src/components/agenda/EventoAgendaCard.jsx
import React, { useState } from 'react';

const EventoAgendaCard = ({ evento }) => {
  const [comentario, setComentario] = useState(evento.comentario || '');
  const [calificacion, setCalificacion] = useState(evento.calificacion || 0);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/agenda/${evento.id_evento}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comentario, calificacion })
      });
      alert('Datos actualizados');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar');
    }
  };

  return (
    <div className="evento-agenda-card">
      <h4>{evento.titulo}</h4>
      <p><strong>Fecha:</strong> {evento.fecha}</p>
      <p><strong>Asistió:</strong> {evento.asistio ? 'Sí' : 'No'}</p>
      <p><strong>Actividad:</strong> {evento.actividad}</p>
      <textarea
        placeholder="Escribe un comentario..."
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="5"
        value={calificacion}
        onChange={(e) => setCalificacion(parseInt(e.target.value))}
      />
      <button type="button" onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

export default EventoAgendaCard;
