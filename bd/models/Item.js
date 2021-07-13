const { Schema, model } = require("mongoose");

const ItemSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
      unique: true,
    },
    utilitat: {
      type: String,
      required: true,
    },
    descripcio: String,
  },
  { versionKey: false }
);

const Item = model("Item", ItemSchema, "items");

module.exports = Item;
