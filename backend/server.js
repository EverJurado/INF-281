require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const eventosRoutes = require('./routes/eventosRoutes');
const crearEventoRoutes = require('./routes/crearEventoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api", authRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api', crearEventoRoutes);



// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
