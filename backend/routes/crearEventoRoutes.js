// backend/routes/crearEventoRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verificarToken } = require('../config/auth');


// POST /api/eventos
router.post('/eventos', verificarToken, async (req, res) => {
  try {
    const {
      titulo, descripcion, foto_evento,
      hora_inicio, hora_fin, fecha,
      costo, modalidad, puntuacion,
      link_reunion
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO Eventos (titulo, descripcion, foto_evento, hora_inicio, hora_fin, fecha, costo, modalidad, puntuacion, link_reunion, reunion_iniciada)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, false)`,
      [titulo, descripcion, foto_evento, hora_inicio, hora_fin, fecha, costo, modalidad, puntuacion, link_reunion]
    );

    res.status(201).json({ id_evento: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear evento' });
  }
});

// POST /api/ubicacion
router.post('/ubicacion', verificarToken, async (req, res) => {
  try {
    const { id_evento, descripcion, direccion, departamento, lat, lng } = req.body;
    await db.query(
      `INSERT INTO Ubicacion (id_evento, descripcion, ubicacion, departamento, lat, lng)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id_evento, descripcion, direccion, departamento, lat, lng]
    );
    res.status(201).json({ message: 'Ubicación registrada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar ubicación' });
  }
});

// POST /api/eventos-categorias
router.post('/eventos-categorias', verificarToken, async (req, res) => {
  try {
    const { id_evento, id_categoria } = req.body;
    await db.query(
      `INSERT INTO Eventos_Categorias (id_evento, id_categoria)
       VALUES ($1, $2)`,
      [id_evento, id_categoria]
    );
    res.status(201).json({ message: 'Categoría asociada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al asociar categoría' });
  }
});

// GET /api/categorias
router.get('/categorias', async (req, res) => {
  try {
    const [categorias] = await db.query('SELECT * FROM Categorias');
    res.json(categorias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cargar categorías' });
  }
});

module.exports = router;
