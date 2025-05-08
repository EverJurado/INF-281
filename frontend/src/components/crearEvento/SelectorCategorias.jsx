// src/components/crearEvento/SelectorCategorias.jsx
import React, { useEffect, useState } from 'react';

const SelectorCategorias = ({ onChange }) => {
  const [categorias, setCategorias] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);

  useEffect(() => {
    // Cargar categorías desde el backend
    const fetchCategorias = async () => {
      try {
        const res = await fetch('/api/categorias');
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
      }
    };
    fetchCategorias();
  }, []);

  const toggleCategoria = (id) => {
    const nuevas = seleccionadas.includes(id)
      ? seleccionadas.filter(c => c !== id)
      : [...seleccionadas, id];

    setSeleccionadas(nuevas);
    onChange(nuevas);
  };

  return (
    <div className="selector-categorias">
      <h4>Categorías del Evento</h4>
      {categorias.map(cat => (
        <label key={cat.id_categoria}>
          <input
            type="checkbox"
            checked={seleccionadas.includes(cat.id_categoria)}
            onChange={() => toggleCategoria(cat.id_categoria)}
          />
          {cat.nombre}
        </label>
      ))}
    </div>
  );
};

export default SelectorCategorias;
