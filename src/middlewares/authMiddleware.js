const jwt = require("jsonwebtoken");

const autenticarToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send({ status: "FAILED", data: { error: "Token no proporcionado" } });
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(403).send({ status: "FAILED", data: { error: "Token inválido o expirado" } });
    }
};

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