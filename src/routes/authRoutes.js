const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { autenticarToken, esAdmin } = require("../middlewares/authMiddleware");

// Publicas
router.post("/registrar", authController.registrar);
router.post("/login", authController.login);

// Solo Admin
router.patch("/usuarios/:email", autenticarToken, esAdmin, authController.actualizarUsuario);
router.delete("/usuarios/:email", autenticarToken, esAdmin, authController.eliminarUsuario);

module.exports = router;