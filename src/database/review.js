const db = require("./firestore");

// Guarda una reseña y actualiza la nota media del libro automáticamente
const agregarReview = async (libroId, reviewData) => {
    try {
        // Creamos un ID único combinando email y libro
        const reviewId = `${reviewData.email}_${libroId}`;

        // Guardamos la reseña
        await db.collection("reviews").doc(reviewId).set({
            libroId: libroId,
            userId: reviewData.email,
            userName: reviewData.nombre,
            rating: Number(reviewData.rating),
            comment: reviewData.comment,
            createdAt: new Date().toISOString()
        });

        // Buscamos todas las reseñas de ese libro para recalcular la media
        let query = db.collection("reviews").where("libroId", "==", libroId);
        const reviewsSnapshot = await query.get();

        const todasLasReviews = reviewsSnapshot.docs.map(doc => doc.data());
        const numReviews = todasLasReviews.length;
        const sumaNotas = todasLasReviews.reduce((acc, curr) => acc + curr.rating, 0);
        const nuevaMedia = parseFloat((sumaNotas / numReviews).toFixed(1));

        // Actualizamos el libro con su nueva puntuación media
        await db.collection("books").doc(libroId).update({
            appRating: nuevaMedia,
            appReviewsCount: numReviews
        });

        return { nuevaMedia, numReviews };
    } catch (error) {
        console.error("Error en database/review.js:", error);
        throw error;
    }
};

// Obtener todas las opiniones escritas sobre un libro
const obtenerReviewsPorLibro = async (libroId) => {
    try {
        const snapshot = await db.collection("reviews").where("libroId", "==", libroId).get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
};

module.exports = { agregarReview, obtenerReviewsPorLibro };