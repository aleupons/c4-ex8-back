const chalk = require("chalk");
const express = require("express");
const { errorServidor } = require("./errors");

const app = express();
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(chalk.yellow(`\nServidor actiu al port ${port}`));
});

server.on("error", (err) => errorServidor(err, port));

module.exports = app;
