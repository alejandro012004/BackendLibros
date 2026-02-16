const authService = require("../services/authService");

const registrar = async (req, res) => {
    const { body } = req;
    // Valido que no me envíen campos vacíos
    if (!body.email || !body.password || !body.nombre) {
        return res.status(400).send({ status: "FAILED", data: { error: "Faltan campos obligatorios" } });
    }
    try {
        const usuarioCreado = await authService.registrar(body);
        res.status(201).send({ status: "OK", data: usuarioCreado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ status: "FAILED", data: { error: "Email y password requeridos" } });
    }
    try {
        // Le paso los datos al servicio para que compruebe si el usuario existe y la contraseña es OK
        const datosLogin = await authService.login(email, password);
        res.send({ status: "OK", data: datosLogin });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const actualizarUsuario = async (req, res) => {
    const { email } = req.params; // Saco el email de la URL
    const { body } = req;
    try {
        const usuarioActualizado = await authService.actualizarUsuario(email, body);
        res.send({ status: "OK", data: usuarioActualizado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const eliminarUsuario = async (req, res) => {
    const { email } = req.params;
    try {
        await authService.eliminarUsuario(email);
        res.status(200).send({ status: "OK", message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { registrar, login, actualizarUsuario, eliminarUsuario};