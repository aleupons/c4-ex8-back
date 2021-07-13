const morgan = require("morgan");
const express = require("express");
const app = require("./init");
const { error404, errorGeneral } = require("./errors");

const iniciaServidor = () => {
  app.use(morgan("dev"));
  app.use(express.json());

  app.get("/vacunacion/centros", async (req, res, next) => {});

  app.use(error404);
  app.use(errorGeneral);
};

module.exports = iniciaServidor;
