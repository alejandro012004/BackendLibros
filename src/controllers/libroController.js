const libroService = require("../services/libroService");
const Usuario = require("../database/usuario");

// Pilla todos los libros aplicando los filtros que vengan por la URL 
const obtenerTodosLosLibros = async (req, res) => {
    const { category, limit, offset, sortDate, language, minRating } = req.query;

    try {
        const todosLosLibros = await libroService.obtenerTodosLosLibros({
            category,
            limit,
            offset,
            sortDate,
            language,
            minRating
        });
        res.send({ status: "OK", data: todosLosLibros });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Busca un libro específico por su ID único
const obtenerUnLibro = async (req, res) => {
    const { params: { libroId } } = req;
    if (!libroId) {
        return res.status(400).send({ status: "FAILED", data: { error: "El ID del libro es obligatorio" } });
    }
    try {
        const libro = await libroService.obtenerUnLibro(libroId);
        res.send({ status: "OK", data: libro });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Crea un libro nuevo y gestiona la subida de la imagen si viene una en el body
const crearNuevoLibro = async (req, res) => {
  try {
    const { ...datosLibro } = req.body;

    const nuevoLibro = await Libro.create(datosLibro);
    
    res.status(201).json({ status: "OK", data: nuevoLibro });
  } catch (error) {
    res.status(500).json({ status: "FAILED", error: error.message });
  }
};

// Actualiza solo los campos que me pases de un libro
const actualizarLibro = async (req, res) => {
    const { body, params: { libroId } } = req;
    if (!libroId) {
        return res.status(400).send({ status: "FAILED", data: { error: "El ID del libro es obligatorio" } });
    }
    try {
        const libroActualizado = await libroService.actualizarLibro(libroId, body);
        res.send({ status: "OK", data: libroActualizado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Borra el libro de la base de datos por su ID
const borrarUnLibro = async (req, res) => {
    const { params: { libroId } } = req;
    if (!libroId) {
        return res.status(400).send({ status: "FAILED", data: { error: "El ID del libro es obligatorio" } });
    }
    try {
        await libroService.borrarUnLibro(libroId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Filtra libros por su género
const obtenerLibrosPorGenero = async (req, res) => {
    const { params: { genero } } = req;
    if (!genero) {
        return res.status(400).send({ status: "FAILED", data: { error: "Debes poner un género" } });
    }
    try {
        const libros = await libroService.obtenerLibrosPorGenero(genero);
        res.send({ status: "OK", data: libros });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Busca libros que contengan el título que le pasas
const obtenerLibrosPorTitulo = async (req, res) => {
    const { params: { titulo } } = req;
    if (!titulo) {
        return res.status(400).send({ status: "FAILED", data: { error: "Debes poner un título" } });
    }
    try {
        const libros = await libroService.obtenerLibrosPorTitulo(titulo);
        res.send({ status: "OK", data: libros });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Pilla los libros con mejor rating
const obtenerLibrosMasPopulares = async (req, res) => {
    try {
        const libros = await libroService.obtenerLibrosMasPopulares();
        res.send({ status: "OK", data: libros });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Pilla las últimas novedades añadidas a la base de datos
const obtenerLibrosRecientes = async (req, res) => {
    try {
        const libros = await libroService.obtenerLibrosRecientes();
        res.send({ status: "OK", data: libros });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Obtiene la lista de favoritos del usuario logueado
const obtenerMisFavoritos = async (req, res) => {
    try {
        const { email } = req.usuario; // req.usuario lo rellena el middleware de auth
        const favoritos = await libroService.obtenerMisFavoritos(email);
        res.send({ status: "OK", data: favoritos });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || "Error desconocido" } });
    }
};

// Si el libro ya es favorito lo quita, si no, lo añade
const actualizarEstadoFavorito = async (req, res) => {
    const { body: { libroId }, usuario: { email } } = req;

    if (!libroId) {
        return res.status(400).send({ status: "FAILED", data: { error: "libroId es requerido" } });
    }

    try {
        const favoritosActuales = await Usuario.obtenerFavoritos(email);

        if (favoritosActuales.includes(libroId)) {
            await Usuario.eliminarFavorito(email, libroId);
            res.send({ status: "OK", message: "Eliminado de favoritos" });
        } else {
            await Usuario.agregarFavorito(email, libroId);
            res.send({ status: "OK", message: "Añadido a favoritos" });
        }
    } catch (error) {
        res.status(500).send({ status: "FAILED", data: { error: error.message || error } });
    }
};

// Sobrescribe un libro entero con datos nuevos
const sustituirLibro = async (req, res) => {
    const { body, params: { libroId } } = req;
    try {
        const libroActualizado = await libroService.sustituirLibro(libroId, body);
        res.send({ status: "OK", data: libroActualizado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


module.exports = {
    obtenerTodosLosLibros,
    obtenerUnLibro,
    crearNuevoLibro,
    actualizarLibro,
    borrarUnLibro,
    obtenerLibrosPorGenero,
    obtenerLibrosPorTitulo,
    obtenerLibrosMasPopulares,
    obtenerLibrosRecientes,
    obtenerMisFavoritos,
    actualizarEstadoFavorito,
    sustituirLibro,
};