// src/components/crearEvento/FormularioEvento.jsx
import React, { useState } from 'react';
import SelectorUbicacion from './SelectorUbicacion';
import SelectorCategorias from './SelectorCategorias';

const FormularioEvento = () => {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    foto_evento: '',
    hora_inicio: '',
    hora_fin: '',
    fecha: '',
    costo: '',
    modalidad: '',
    puntuacion: 0,
    link_reunion: '',
    categorias: [],
    ubicacion: {
      descripcion: '',
      direccion: '',
      departamento: '',
      lat: '',
      lng: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUbicacionChange = (ubicacion) => {
    setForm(prev => ({ ...prev, ubicacion }));
  };

  const handleCategoriasChange = (categorias) => {
    setForm(prev => ({ ...prev, categorias }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // 1. Crear evento
      const resEvento = await fetch('/api/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const evento = await resEvento.json();

      // 2. Crear ubicación
      await fetch('/api/ubicacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...form.ubicacion, id_evento: evento.id_evento })
      });

      // 3. Asociar categorías
      for (let id_categoria of form.categorias) {
        await fetch('/api/eventos-categorias', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ id_evento: evento.id_evento, id_categoria })
        });
      }

      alert('Evento creado correctamente.');
    } catch (err) {
      console.error(err);
      alert('Error al crear evento.');
    }
  };

  return (
    <form className="formulario-evento" onSubmit={handleSubmit}>
      <input type="text" name="titulo" placeholder="Título del evento" onChange={handleChange} required />
      <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
      <input type="text" name="foto_evento" placeholder="URL de imagen" onChange={handleChange} required />
      <input type="time" name="hora_inicio" onChange={handleChange} required />
      <input type="time" name="hora_fin" onChange={handleChange} required />
      <input type="date" name="fecha" onChange={handleChange} required />
      <input type="text" name="costo" placeholder="Costo (0 si es gratuito)" onChange={handleChange} required />
      <select name="modalidad" onChange={handleChange} required>
        <option value="">Selecciona modalidad</option>
        <option value="presencial">Presencial</option>
        <option value="virtual">Virtual</option>
        <option value="mixto">Mixto</option>
      </select>
      <input type="text" name="link_reunion" placeholder="Enlace a reunión (si aplica)" onChange={handleChange} />

      <SelectorCategorias onChange={handleCategoriasChange} />
      <SelectorUbicacion onChange={handleUbicacionChange} />

      <button type="submit">Crear Evento</button>
    </form>
  );
};

export default FormularioEvento;
