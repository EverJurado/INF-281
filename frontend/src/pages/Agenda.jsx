// src/pages/Agenda.jsx
import React, { useEffect, useState } from 'react';
import AgendaLista from '../components/agenda/AgendaLista';
import '../styles/agenda.css';

const Agenda = () => {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/agenda', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setAgenda(data);
      } catch (err) {
        console.error('Error al cargar la agenda:', err);
      }
    };
    fetchAgenda();
  }, []);

  return (
    <div className="agenda-page">
      <h2>Mi Agenda</h2>
      <AgendaLista eventos={agenda} />
    </div>
  );
};

export default Agenda;
