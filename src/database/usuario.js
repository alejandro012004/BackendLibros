const db = require("./firestore");

// Crear perfil de usuario usando su email como ID
const crearNuevoUsuario = async (nuevoUsuario) => {
    try {
        await db.collection("users").doc(nuevoUsuario.email).set(nuevoUsuario);
        return nuevoUsuario;
    } catch (error) {
        throw error;
    }
};

// Vincular un libro como favorito de un usuario
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

// Obtener la lista de IDs de libros favoritos del usuario
const obtenerFavoritos = async (email) => {
    try {
        const snapshot = await db.collection("favorites").where("userId", "==", email).get();
        return snapshot.docs.map(doc => doc.data().libroId);
    } catch (error) {
        throw error;
    }
};

module.exports = { crearNuevoUsuario, agregarFavorito, obtenerFavoritos };