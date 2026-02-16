const reviewService = require("../database/review");

// Función para buscar las reseñas de un libro
const obtenerReviewsLibro = async (req, res) => {
    const { params: { libroId } } = req; // Sacamos el ID del libro de la URL

    // Si no envían el ID, devolvemos error
    if (!libroId) {
        return res.status(400).send({ status: "FAILED", data: { error: "El parámetro :libroId no puede estar vacío" } });
    }

    try {
        const reviews = await reviewService.obtenerReviewsPorLibro(libroId);
        res.send({ status: "OK", data: reviews });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

// Función para guardar una nueva reseña
const dejarReview = async (req, res) => {
    const { params: { libroId }, body } = req; // Sacamos el ID y los datos del cuerpo
    const { rating, comment } = body;
    
    const email = req.usuario.email; // Datos del usuario que escribe
    const nombre = req.usuario?.nombre || email.split('@')[0];
    
    // Validamos que la nota sea del 1 al 5
    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).send({ status: "FAILED", data: { error: "Rating debe ser entre 1 y 5" } });
    }

    try {
        const resultado = await reviewService.agregarReview(libroId, {
            email,
            nombre,
            rating,
            comment
        });
        res.status(201).send({ status: "OK", message: "Review procesada", data: resultado });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { obtenerReviewsLibro, dejarReview };