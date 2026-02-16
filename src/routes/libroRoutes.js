const express = require("express");
const router = express.Router();
const libroController = require("../controllers/libroController");
const { autenticarToken, esAdmin } = require("../middlewares/authMiddleware");
const reviewController = require("../controllers/reviewController");

// Publicas
router.get("/", libroController.obtenerTodosLosLibros);
router.get("/populares", libroController.obtenerLibrosMasPopulares);
router.get("/recientes", libroController.obtenerLibrosRecientes);
router.get("/mis-favoritos", autenticarToken, libroController.obtenerMisFavoritos);
router.post("/favoritos", autenticarToken, libroController.actualizarEstadoFavorito);
router.get("/:libroId", libroController.obtenerUnLibro);
router.get("/genero/:genero", libroController.obtenerLibrosPorGenero);
router.get("/buscar/:titulo", libroController.obtenerLibrosPorTitulo);
router.get("/:libroId/reviews", reviewController.obtenerReviewsLibro);
router.post("/:libroId/reviews", autenticarToken, reviewController.dejarReview);

// Solo Admin
router.post("/", autenticarToken, esAdmin, libroController.crearNuevoLibro);
router.patch("/:libroId", autenticarToken, esAdmin, libroController.actualizarLibro);
router.delete("/:libroId", autenticarToken, esAdmin, libroController.borrarUnLibro);
router.put("/:libroId", autenticarToken, esAdmin, libroController.sustituirLibro);

module.exports = router;