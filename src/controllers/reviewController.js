const reviewService = require("../database/review");

const obtenerReviewsLibro = async (req, res) => {
    const { params: { libroId } } = req;

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

const dejarReview = async (req, res) => {
    const { params: { libroId }, body } = req;
    const { rating, comment } = body;
   
    const email = req.usuario.email;
    const nombre = req.usuario?.nombre || email.split('@')[0];
   
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