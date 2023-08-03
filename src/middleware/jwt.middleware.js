// req.query = query params, viene de la ruta http://localhost:4000/api/usuarios?nombre=jesus&apellido=fernandez
// req.params = parametros, viene de la ruta http://localhost:4000/api/usuarios/jesus/fernandez
// req.body = cuerpo de la peticion POST PUT, {nombre: "Jesus", apellido: "Fernandez"}
// req.header = encabezado de la peticion GET, POST, PUT, DELETE ??

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
      data: {},
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Token no valido",
        data: {},
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
      data: {},
    });
  }
};

module.exports = {
  validarJWT,
};
