const db = require("./firestore");

const agregarReview = async (libroId, reviewData) => {
    try {
        const reviewId = `${reviewData.email}_${libroId}`;
       
        await db.collection("reviews").doc(reviewId).set({
            libroId: libroId,
            userId: reviewData.email,
            userName: reviewData.nombre,
            rating: Number(reviewData.rating),
            comment: reviewData.comment,
            createdAt: new Date().toISOString()
        });

        let query = db.collection("reviews");
        query = query.where("libroId", "==", libroId);

        const reviewsSnapshot = await query.get();

        const todasLasReviews = reviewsSnapshot.docs.map(doc => doc.data());
        const numReviews = todasLasReviews.length;
        const sumaNotas = todasLasReviews.reduce((acc, curr) => acc + curr.rating, 0);
        const nuevaMedia = parseFloat((sumaNotas / numReviews).toFixed(1));

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

const obtenerReviewsPorLibro = async (libroId) => {
    try {
        let query = db.collection("reviews");
        query = query.where("libroId", "==", libroId);
        const snapshot = await query.get();
       
        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw error;
    }
};

module.exports = { agregarReview, obtenerReviewsPorLibro };