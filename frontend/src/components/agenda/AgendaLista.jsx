// src/components/agenda/AgendaLista.jsx
import React from 'react';
import EventoAgendaCard from './EventoAgendaCard';

const AgendaLista = ({ eventos }) => {
  return (
    <div className="agenda-lista">
      {eventos.length === 0 ? (
        <p>No hay eventos en tu agenda.</p>
      ) : (
        eventos.map(evento => (
          <EventoAgendaCard key={evento.id_evento} evento={evento} />
        ))
      )}
    </div>
  );
};

export default AgendaLista;
