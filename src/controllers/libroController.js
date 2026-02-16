const libroService = require("../services/libroService");
const Usuario = require("../database/usuario");

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

const obtenerUnLibro = async (req, res) => {
    const { params: { libroId } } = req;
    if (!libroId) {
        return res.status(400).send({ status: "FAILED", data: { error: "Parameter ':libroId' can not be empty" } });
    }
    try {
        const libro = await libroService.obtenerUnLibro(libroId);
        res.send({ status: "OK", data: libro });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const crearNuevoLibro = async (req, res) => {
  try {
    let { image, ...datosLibro } = req.body;

    if (image) {
      const urlSegura = await subirImagen(image);
      if (urlSegura) image = urlSegura;
    }

    const nuevoLibro = await Libro.create({ ...datosLibro, image });
   
    res.status(201).json({ status: "OK", data: nuevoLibro });
  } catch (error) {
    res.status(500).json({ status: "FAILED", error: error.message });
  }
};

const actualizarLibro = async (req, res) => {
    const { body, params: { libroId } } = req;
    if (!libroId) {
        return res.status(400).send({ status: "FAILED", data: { error: "Parameter ':libroId' can not be empty" } });
    }
    try {
        const libroActualizado = await libroService.actualizarLibro(libroId, body);
        res.send({ status: "OK", data: libroActualizado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const borrarUnLibro = async (req, res) => {
    const { params: { libroId } } = req;
    if (!libroId) {
        return res.status(400).send({ status: "FAILED", data: { error: "Parameter ':libroId' can not be empty" } });
    }
    try {
        await libroService.borrarUnLibro(libroId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const obtenerLibrosPorGenero = async (req, res) => {
    const { params: { genero } } = req;
    if (!genero) {
        return res.status(400).send({ status: "FAILED", data: { error: "Parameter ':genero' can not be empty" } });
    }
    try {
        const libros = await libroService.obtenerLibrosPorGenero(genero);
        res.send({ status: "OK", data: libros });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const obtenerLibrosPorTitulo = async (req, res) => {
    const { params: { titulo } } = req;
    if (!titulo) {
        return res.status(400).send({ status: "FAILED", data: { error: "Parameter ':titulo' can not be empty" } });
    }
    try {
        const libros = await libroService.obtenerLibrosPorTitulo(titulo);
        res.send({ status: "OK", data: libros });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const obtenerLibrosMasPopulares = async (req, res) => {
    try {
        const libros = await libroService.obtenerLibrosMasPopulares();
        res.send({ status: "OK", data: libros });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const obtenerLibrosRecientes = async (req, res) => {
    try {
        const libros = await libroService.obtenerLibrosRecientes();
        res.send({ status: "OK", data: libros });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const obtenerMisFavoritos = async (req, res) => {
    try {
        const { email } = req.usuario;
        const favoritos = await libroService.obtenerMisFavoritos(email);
        res.send({ status: "OK", data: favoritos });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || "Error desconocido" } });
    }
};

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