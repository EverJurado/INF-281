// backend/routes/agendaRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticate = require('../config/auth');

// GET /api/agenda - eventos con like para el usuario autenticado
router.get('/agenda', authenticate, async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const [result] = await db.query(`
      SELECT e.id_evento, e.titulo, a.fecha, a.comentario, a.calificacion,
             a.asistio, a.hora_ingreso, a.actividad
      FROM Agenda a
      JOIN Eventos e ON e.id_evento = a.id_evento
      WHERE a.id_usuario = ?
    `, [id_usuario]);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener agenda' });
  }
});

// PATCH /api/agenda/:id_evento - actualizar comentario y calificación
router.patch('/agenda/:id_evento', authenticate, async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const { comentario, calificacion } = req.body;
    const { id_evento } = req.params;

    await db.query(`
      UPDATE Agenda
      SET comentario = ?, calificacion = ?
      WHERE id_usuario = ? AND id_evento = ?
    `, [comentario, calificacion, id_usuario, id_evento]);

    res.json({ message: 'Agenda actualizada' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar agenda' });
  }
});

module.exports = router;
