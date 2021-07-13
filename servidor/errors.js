const chalk = require("chalk");

const errorServidor = (err, port) => {
  console.log(chalk.red("No s'ha pogut aixecar el servidor"));
  if (err.code === "EADDRINUSE") {
    console.log(chalk.red(`El port ${chalk.red.bold(port)} està ocupat`));
  }
};

const error404 = (req, res, next) => {
  res.status(404).json({ error: true, mensaje: "La ruta no existeix" });
};

const errorGeneral = (err, req, res, next) => {
  const codi = err.codi || 500;
  const missatge = err.codi ? err.message : "Error general";
  res.status(codi).json({ error: true, missatge });
};

module.exports = { errorServidor, error404, errorGeneral };
