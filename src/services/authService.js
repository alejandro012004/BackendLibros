const Usuario = require("../database/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registrar = async (datosUsuario) => {
    try {
        const usuarioExistente = await Usuario.obtenerUsuarioPorEmail(datosUsuario.email);
        if (usuarioExistente) {
            throw { status: 400, message: "El usuario ya existe" };
        }

        const passwordCifrada = await bcrypt.hash(datosUsuario.password, 10);
       
        const nuevoUsuario = {
            nombre: datosUsuario.nombre,
            email: datosUsuario.email,
            password: passwordCifrada,
            rol: datosUsuario.rol || "usuario",
            createdAt: new Date().toISOString()
        };

        return await Usuario.crearNuevoUsuario(nuevoUsuario);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const login = async (email, password) => {
    try {
        const usuario = await Usuario.obtenerUsuarioPorEmail(email);
        if (!usuario) {
            throw { status: 401, message: "Credenciales incorrectas" };
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecta) {
            throw { status: 401, message: "Credenciales incorrectas" };
        }

        const token = jwt.sign(
            {
                email: usuario.email,
                nombre: usuario.nombre,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return {
            token,
            usuario: {
                email: usuario.email,
                nombre: usuario.nombre,
                rol: usuario.rol
            }
        };
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = { registrar, login };