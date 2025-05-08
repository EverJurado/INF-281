# Proyecto Bicentenario de Bolivia

Aplicación web desarrollada con React (frontend) y Express.js (backend) para difundir eventos, historia, cultura y actividades del Bicentenario de Bolivia.

---

## 📚 Estructura del Proyecto

### /frontend
Aplicación desarrollada con React y Vite.

#### /src/components
- `Button.jsx`, `Footer.jsx`, `InputField.jsx`, etc.
- **/eventos**
  - `FiltrosEventos.jsx`: filtros por fecha, precio, modalidad y tipo.
  - `EventoCard.jsx`: tarjeta visual de un evento.
  - `ListaEventos.jsx`: lista vertical de eventos.
  - `MapaEventos.jsx`: visualización en Leaflet.

#### /src/pages
- `Inicio.jsx`, `Acceso.jsx`, etc.
- `Eventos.jsx`: página principal de eventos (con filtros, lista y mapa).

#### /src/styles
- `eventos.css`: estilos para la página de eventos.

### /backend
Servidor Node.js + Express.js conectado a base de datos (por ejemplo MySQL o PostgreSQL).

#### /config
- `db.js`: conexión a la base de datos
- `auth.js`: middleware de autenticación

#### /routes
- `authRoutes.js`: login, registro, verificación
- `eventosRoutes.js`: endpoints para listar eventos y registrar likes

#### /controllers, /models, /services
- `authController.js`, `userModel.js`, `emailService.js`

---

## 🔗 Funcionalidades implementadas

### Eventos
- Visualización de todos los eventos
- Filtros por fecha, precio, modalidad y tipo
- Mapa con ubicaciones (Leaflet)
- Botón de "like" para agregar evento a agenda

### Agenda (planeado)
- Mostrar eventos marcados con like
- Calificación y comentarios post-evento

### Crear Evento (planeado)
- Formulario para organizadores
- Asignación de ubicación, categorías y modalidad

---

## ⚖️ Stack Tecnológico

- **Frontend**: React + Vite + Leaflet
- **Backend**: Node.js + Express + JWT
- **Base de datos**: relacional (SQL), incluye tablas `Eventos`, `Ubicacion`, `Categorias`, `Agenda`

---

## 🚀 Próximos pasos

- [ ] Crear página `CrearEvento.jsx` y componentes asociados
- [ ] Crear página `Agenda.jsx` con actualización de comentario/calificación
- [ ] Subida de imagen para `foto_evento`
- [ ] Validación y autorización por rol (organizador)

---

## ✉️ Autor
**Victor**, proyecto educativo y cultural Bicentenario Bolivia
