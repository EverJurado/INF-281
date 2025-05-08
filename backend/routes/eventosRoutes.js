// backend/routes/eventosRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { verificarToken } = require('../config/auth');


// GET /api/eventos (con filtros)
router.get('/', async (req, res) => {
  try {
    const { fecha, modalidad, tipo, precio } = req.query;

    let query = `
      SELECT e.*, u.descripcion AS ubicacion, u.departamento, u.lat, u.lng
      FROM Eventos e
      JOIN Ubicacion u ON e.id_evento = u.id_evento
      LEFT JOIN Eventos_Categorias ec ON ec.id_evento = e.id_evento
      LEFT JOIN Categorias c ON c.id_categoria = ec.id_categoria
      WHERE 1=1
    `;
    const params = [];

    if (modalidad) {
      query += ' AND e.modalidad = ?';
      params.push(modalidad);
    }
    if (tipo) {
      query += ' AND c.nombre = ?';
      params.push(tipo);
    }
    if (precio) {
      if (precio === 'gratis') {
        query += ` AND e.costo = '0'`;
      } else if (precio === 'pago') {
        query += ` AND e.costo != '0'`;
      }
    }
    if (fecha) {
      const today = new Date();
      const f = new Date();
      switch (fecha) {
        case 'hoy':
          query += ' AND e.fecha = CURDATE()'; break;
        case 'manana':
          query += ' AND e.fecha = CURDATE() + INTERVAL 1 DAY'; break;
        case 'semana':
          query += ' AND WEEK(e.fecha) = WEEK(CURDATE())'; break;
        case 'mes':
          query += ' AND MONTH(e.fecha) = MONTH(CURDATE())'; break;
      }
    }

    query += ' ORDER BY e.fecha ASC';
    const [result] = await db.query(query, params);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
});

// POST /api/agenda/:id_evento
router.post('/agenda/:id_evento', verificarToken, async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const id_evento = req.params.id_evento;

    const [exist] = await db.query(
      'SELECT * FROM Agenda WHERE id_usuario = ? AND id_evento = ?',
      [id_usuario, id_evento]
    );

    if (exist.length === 0) {
      await db.query(
        'INSERT INTO Agenda (id_usuario, id_evento, actividad, fecha) VALUES (?, ?, ?, CURDATE())',
        [id_usuario, id_evento, 'Like']
      );
    }

    res.json({ message: 'Agregado a la agenda' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar a la agenda' });
  }
});

module.exports = router;

