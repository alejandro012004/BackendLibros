const Libro = require("../database/libro");
const Usuario = require("../database/usuario");
const NodeCache = require("node-cache");

// Creamos una memoria temporal (Cache) para no pedir datos repetidos a la DB cada segundo
const myCache = new NodeCache({ stdTTL: 600 });

const obtenerTodosLosLibros = async (filterParams) => {
    try {
        return await Libro.obtenerTodosLosLibros(filterParams);
    } catch (error) {
        throw error;
    }
};

const obtenerUnLibro = async (libroId) => {
    try {
        const libro = await Libro.obtenerUnLibro(libroId);
        if (!libro) {
            throw { status: 404, message: `No se puede encontrar el libro con el id '${libroId}'` };
        }
        return libro;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

// Crea un libro nuevo si no existe ya el mismo ID de Google
const crearNuevoLibro = async (nuevoLibro) => {
    try {
        const libroExistente = await Libro.obtenerUnLibro(nuevoLibro.googleId);
        if (libroExistente) {
            throw { status: 404, message: `El libro con googleId '${nuevoLibro.googleId}' ya existe` };
        }

        const libroAInsertar = {
            ...nuevoLibro,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        return await Libro.crearNuevoLibro(libroAInsertar);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const actualizarLibro = async (libroId, cambios) => {
    try {
        const libroExistente = await Libro.obtenerUnLibro(libroId);
        if (!libroExistente) {
            throw { status: 400, message: `No se puede encontrar el libro con el id '${libroId}'` };
        }

        const datosActualizados = {
            ...cambios,
            updatedAt: new Date().toISOString()
        };

        return await Libro.actualizarLibro(libroId, datosActualizados);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const borrarUnLibro = async (libroId) => {
    try {
        const libroExistente = await Libro.obtenerUnLibro(libroId);
        if (!libroExistente) {
            throw { status: 400, message: `No se puede encontrar el libro con el id '${libroId}'` };
        }
        await Libro.borrarUnLibro(libroId);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const obtenerLibrosPorGenero = async (genero) => {
    try {
        return await Libro.obtenerLibrosPorGenero(genero);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const obtenerLibrosPorTitulo = async (titulo) => {
    try {
        return await Libro.obtenerLibrosPorTitulo(titulo);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

// Busca populares: primero mira en el "Cache" (memoria rápida), si no están, va a la DB
const obtenerLibrosMasPopulares = async () => {
    try {
        const cacheKey = "libros_populares";
        const cachedData = myCache.get(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        const librosPopulares = await Libro.obtenerLibrosMasPopulares();
        myCache.set(cacheKey, librosPopulares);
        
        return librosPopulares;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const obtenerLibrosRecientes = async () => {
    try {
        return await Libro.obtenerLibrosRecientes();
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

// Busca los IDs de favoritos del usuario y luego pide los datos de cada libro
const obtenerMisFavoritos = async (email) => {
    try {
        const idsFavoritos = await Usuario.obtenerFavoritos(email);
        
        if (idsFavoritos.length === 0) return [];

        const promesas = idsFavoritos.map(id => Libro.obtenerUnLibro(id));
        const librosCompletos = await Promise.all(promesas);
        
        return librosCompletos.filter(l => l !== null);
    } catch (error) {
        throw { status: 500, message: error.message };
    }
};

// Reemplaza un libro mezclando lo nuevo con lo que ya había si falta algo
const sustituirLibro = async (libroId, datosNuevos) => {
    try {
        const libroExistente = await Libro.obtenerUnLibro(libroId);
        if (!libroExistente) {
            throw { status: 404, message: `Libro con ID ${libroId} no encontrado` };
        }

        const libroParaSustituir = {
            googleId: datosNuevos.googleId || libroExistente.googleId || libroId,
            title: datosNuevos.title || libroExistente.title || "Sin título",
            authors: datosNuevos.authors || libroExistente.authors || [],
            publishedDate: datosNuevos.publishedDate || libroExistente.publishedDate || "",
            description: datosNuevos.description || libroExistente.description || "",
            genre: datosNuevos.genre || libroExistente.genre || "",
            pageCount: Number(datosNuevos.pageCount || libroExistente.pageCount || 0),
            appRating: Number(datosNuevos.appRating || libroExistente.appRating || 0),
            createdAt: libroExistente.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const datosFinales = JSON.parse(JSON.stringify(libroParaSustituir));
        return await Libro.sustituirLibro(libroId, datosFinales);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
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
    sustituirLibro,
};