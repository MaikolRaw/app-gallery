const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use((req, res, next) => {
  console.log('Solicitud desde:', req.headers.origin);
  next();
});

// Configuración de CORS (ajusta la URL según corresponda)
app.use(cors({
  origin: ['http://localhost:8100', 'http://localhost:8101', ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));




// Configurar body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const photoRoutes = require('./routes/photo.routes');

app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);

module.exports = app;
