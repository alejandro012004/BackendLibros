const db = require("./firestore");

const obtenerTodosLosLibros = async (filterParams) => {
    try {
        let query = db.collection("books");

        if (filterParams.language) {
            query = query.where("language", "==", filterParams.language);
        }

        if (filterParams.minRating) {
            query = query.where("appRating", ">=", Number(filterParams.minRating));
        }

        if (filterParams.sortDate === 'desc') {
            query = query.orderBy("createdAt", "desc");
        } else if (filterParams.sortDate === 'asc') {
            query = query.orderBy("createdAt", "asc");
        }

        const limit = parseInt(filterParams.limit) || 10;
        const offset = parseInt(filterParams.offset) || 0;
       
        query = query.limit(limit).offset(offset);

        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
};

const obtenerUnLibro = async (libroId) => {
    try {
        const doc = await db.collection("books").doc(libroId).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    } catch (error) {
        throw error;
    }
};

const crearNuevoLibro = async (nuevoLibro) => {
    try {
        await db.collection("books").doc(nuevoLibro.googleId).set(nuevoLibro);
        return nuevoLibro;
    } catch (error) {
        throw error;
    }
};

const actualizarLibro = async (libroId, cambios) => {
    try {
        await db.collection("books").doc(libroId).update(cambios);
        const actualizado = await db.collection("books").doc(libroId).get();
        return { id: actualizado.id, ...actualizado.data() };
    } catch (error) {
        throw error;
    }
};

const borrarUnLibro = async (libroId) => {
    try {
        await db.collection("books").doc(libroId).delete();
    } catch (error) {
        throw error;
    }
};

const obtenerLibrosPorGenero = async (genero) => {
    try {
        let query = db.collection("books");
        query = query.where("genre", "==", genero);
        const snapshot = await query.get();
        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
};

const obtenerLibrosPorTitulo = async (titulo) => {
    try {
        let query = db.collection("books");
        query = query.where("title", "==", titulo);
        const snapshot = await query.get();
        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
};

const obtenerLibrosMasPopulares = async () => {
    try {
        let query = db.collection("books");
        query = query.orderBy("appRating", "desc").limit(10);

        const snapshot = await query.get();

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        throw error;
    }
};

const obtenerLibrosRecientes = async () => {
    try {
        let query = db.collection("books");
        query = query.orderBy("publishedDate", "desc").limit(10);
        const snapshot = await query.get();
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        throw error;
    }
};

const sustituirLibro = async (libroId, datosCompletos) => {
    try {
        await db.collection("books").doc(libroId).set(datosCompletos);
        return { id: libroId, ...datosCompletos };
    } catch (error) {
        throw error;
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
    sustituirLibro,
};