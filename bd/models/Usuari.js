const { Schema, model } = require("mongoose");

const UsuariSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
      unique: true,
    },
    contrassenya: {
      type: String,
      required: true,
    },
    items: { type: [Schema.Types.ObjectId], ref: "Item" },
  },
  { versionKey: false }
);

const Usuari = model("Usuari", UsuariSchema, "usuaris");

module.exports = Usuari;
