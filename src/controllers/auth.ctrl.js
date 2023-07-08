const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt.helper");

const registrarUsuario = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);

    const nuevo_usuario = {
      user_name,
      password: bcrypt.hashSync(password, salt),
    };

    const new_user = await User(nuevo_usuario).save();

    const token = await generarJWT(new_user.id);

    return res.json({
      ok: true,
      msg: "Usuario Registrado",
      data: new_user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const iniciarSesion = async (req, res) => {
  const { user_name, password } = req.body;

  const user = await User.findOne({ user_name: user_name });

  if (!user) {
    return res.status(400).json({
      ok: false,
      msg: "Usuario o password Incorrecto",
    });
  }

  const validPassword = bcrypt.compareSync(password, user.passwword);

  if (!validPassword) {
    return (
      res.status(400),
      json({
        ok: false,
        msg: "Usuario o password Incorrecto",
        data: {},
      })
    );
  }

  const token = await generarJWT(user.id);

  return res.json({
    ok: true,
    msg: "Acceso Correcto",
    data: {},
    token,
  });
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
};
