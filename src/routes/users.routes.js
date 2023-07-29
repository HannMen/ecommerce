const { Router } = require("express");
const { validarJWT } = require("../middleware/jwt.middleware");

const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/users.ctrl");

const router = Router();

router.get("/", obtenerUsuarios);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;