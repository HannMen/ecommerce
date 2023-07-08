const Product = require("../models/product");

const obtenerProductos = async (req, res) => {
  try {
    const products = await Product.find();

    return res.json({
      ok: true,
      msg: "Productos obtenidos",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const producto = {
      name: name,
      description: description,
      price: price,
    };

    const new_product = await Product.create(producto);

    return res.json({
      ok: true,
      msg: `Se creó un nuevo producto llamado ${new_product.name}`,
      data: new_product,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, status } = req.body;

    const informacion_nueva = {
      name,
      description,
      price,
      status,
    };

    const producto_actualizado = await Product.findByIdAndUpdate(
      id,
      informacion_nueva,
      { new: true }
    );

    return res.json({
      ok: true,
      msg: "Producto actualizado",
      data: producto_actualizado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto_eliminado = await Product.findByIdAndRemove(id);

    return res.json({
      ok: true,
      msg: "Producto eliminado",
      data: producto_eliminado,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
      data: {},
    });
  }
};

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
