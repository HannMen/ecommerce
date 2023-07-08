const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  user_name: {
    type: String,
    required: [true, "El user name es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
});

module.exports = model("user", UserSchema, "users");