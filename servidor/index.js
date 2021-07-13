require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = require("./init");
const { error404, errorGeneral, generarError } = require("./errors");
const Usuari = require("../bd/models/Usuari");

const authMiddleware = (req, res, next) => {
  if (!req.header("Authorization")) {
    const nouError = generarError("Petició no autentificada", 403);
    return next(nouError);
  }
  const token = req.header("Authorization").split(" ")[1];
  try {
    const dadesToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = dadesToken;
    req.idUsuari = id;
    next();
  } catch (error) {
    if (error.message.includes("expired")) {
      const nouError = generarError("Token caducat", 403);
      return next(nouError);
    }
    next(error);
  }
};

const iniciaServidor = () => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());

  app.get("/items/llistat", authMiddleware, async (req, res, next) => {
    const id = req.idUsuari;
    const usuari = await Usuari.findById(id).populate("items");
    if (!usuari) {
      const nouError = generarError("L'usuari no existeix", 404);
      return next(nouError);
    }
    const dades = usuari.items;
    res.json({
      dades,
    });
  });

  app.put("/usuaris/login", async (req, res, next) => {
    const { usuari, contrassenya } = req.body;
    if (!usuari || !contrassenya) {
      const nouError = generarError("Falten credencials", 400);
      return next(nouError);
    }
    const usuariTrobat = await Usuari.findOne({ usuari });
    if (usuariTrobat.length !== 0) {
      const token = jwt.sign({ id: usuariTrobat._id }, process.env.JWT_SECRET, {
        expiresIn: "1y",
      });
      res.json({ token });
    } else {
      const nouError = generarError("Credencials incorrectes", 403);
      return next(nouError);
    }
  });

  app.use(error404);
  app.use(errorGeneral);
};

module.exports = iniciaServidor;
