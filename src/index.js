require('dotenv').config(); 
const express = require('express');
const helmet = require("helmet"); 
const cors = require('cors'); 
const rateLimit = require("express-rate-limit"); 
const AuthRouter = require("./routes/authRoutes");
const LibrosRouter = require("./routes/libroRoutes");
const { swaggerDocs } = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 3000;

// Para que no me saturen la API a peticiones
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50,
    message: {
        status: "FAILED",
        data: { error: "Demasiadas peticiones. Inténtalo en un minuto." }
    }
});

// Configuración de seguridad y lectura de datos
app.use(helmet());
app.use(cors()); 
app.use(express.json());
app.use(limiter); // Activo el límite de peticiones

// Mis rutas principales
app.use("/api/v1/auth", AuthRouter); // Rutas de usuarios/login
app.use("/api/v1/libros", LibrosRouter); // Rutas de los libros

// Mensaje de confirmación al entrar a la raíz
app.get("/", (req, res) => {
    res.send({ 
        status: "OK", 
        message: "API de Libros operativa",
        docs: `http://localhost:${PORT}/api/v1/docs` 
    });
});

// Arranco el servidor y la documentación
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    swaggerDocs(app, PORT); 
});