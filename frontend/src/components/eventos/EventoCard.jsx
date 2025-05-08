// src/components/eventos/EventoCard.jsx
import React, { useState } from 'react';
import './EventoCard.css';

const EventoCard = ({ evento, onLike }) => {
  const [liked, setLiked] = useState(false);

  const manejarLike = () => {
    setLiked(!liked);
    onLike(evento.id_evento);
  };

  return (
    <div className="evento-card">
      <img src={evento.foto_evento} alt={evento.titulo} className="evento-img" />
      <div className="evento-info">
        <h4>{evento.titulo}</h4>
        <p><strong>Fecha:</strong> {evento.fecha}</p>
        <p><strong>Hora:</strong> {evento.hora_inicio} - {evento.hora_fin}</p>
        <p><strong>Lugar:</strong> {evento.lugar}</p>
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={manejarLike}>
          {liked ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default EventoCard;
