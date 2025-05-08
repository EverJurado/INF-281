// src/components/crearEvento/SelectorUbicacion.jsx
import React, { useState } from 'react';

const SelectorUbicacion = ({ onChange }) => {
  const [direccion, setDireccion] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const buscarCoordenadas = async () => {
    try {
      const query = encodeURIComponent(`${direccion}, ${departamento}, Bolivia`);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        onChange({
          descripcion,
          direccion,
          departamento,
          lat,
          lng: lon
        });
        alert('Ubicación obtenida correctamente');
      } else {
        alert('No se encontró la ubicación');
      }
    } catch (error) {
      console.error('Error al buscar ubicación:', error);
      alert('Error al obtener coordenadas');
    }
  };

  return (
    <div className="selector-ubicacion">
      <h4>Ubicación del Evento</h4>
      <input
        type="text"
        placeholder="Descripción del lugar (Ej. Teatro al aire libre)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Departamento"
        value={departamento}
        onChange={(e) => setDepartamento(e.target.value)}
      />
      <button type="button" onClick={buscarCoordenadas}>
        Obtener coordenadas
      </button>
    </div>
  );
};

export default SelectorUbicacion;
