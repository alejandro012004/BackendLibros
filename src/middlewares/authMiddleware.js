const jwt = require("jsonwebtoken");

// Valida que el token de la cabecera sea auténtico
const autenticarToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send({ status: "FAILED", data: { error: "Token no proporcionado" } });
    }

    try {
        // Descifra el token y guarda los datos del usuario en el objeto req
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(403).send({ status: "FAILED", data: { error: "Token inválido o expirado" } });
    }
};

// Verifica si el usuario tiene el rol necesario para rutas restringidas
const esAdmin = (req, res, next) => {
    if (req.usuario && req.usuario.rol === "admin") {
        next();
    } else {
        res.status(403).send({ 
            status: "FAILED", 
            data: { error: "Acceso denegado: Se requieren permisos de administrador" } 
        });
    }
};

module.exports = { autenticarToken, esAdmin };