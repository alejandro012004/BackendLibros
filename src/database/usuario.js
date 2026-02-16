const db = require("./firestore");

const crearNuevoUsuario = async (nuevoUsuario) => {
    try {
        await db.collection("users").doc(nuevoUsuario.email).set(nuevoUsuario);
        return nuevoUsuario;
    } catch (error) {
        throw error;
    }
};

const obtenerUsuarioPorEmail = async (email) => {
    try {
        const doc = await db.collection("users").doc(email).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        throw error;
    }
};

const agregarFavorito = async (email, libroId) => {
    try {
        const favId = `${email}_${libroId}`;
       
        await db.collection("favorites").doc(favId).set({
            userId: email,
            libroId: libroId,
            addedAt: new Date().toISOString()
        });
       
        return { message: "Libro añadido a favoritos" };
    } catch (error) {
        throw error;
    }
};

const obtenerFavoritos = async (email) => {
    try {
        let query = db.collection("favorites");
        query = query.where("userId", "==", email);
       
        const snapshot = await query.get();
       
        return snapshot.docs.map(doc => doc.data().libroId);
    } catch (error) {
        throw error;
    }
};

const eliminarFavorito = async (email, libroId) => {
    try {
        const favId = `${email}_${libroId}`;
        await db.collection("favorites").doc(favId).delete();
       
        return { message: "Libro eliminado de favoritos" };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    crearNuevoUsuario,
    obtenerUsuarioPorEmail,
    agregarFavorito,
    obtenerFavoritos,
    eliminarFavorito,
};