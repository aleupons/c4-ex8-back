require("dotenv").config();
const debug = require("debug")("usuaris:bd:conexion");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectarBD = (servidor) => {
  mongoose.connect(
    process.env.URL_DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        debug(chalk.red("No s'ha pogut connectar amb la BBDD"));
        debug(chalk.red(err.message));
        return;
      }
      debug(chalk.yellow("Connectant a la BBDD"));
      servidor();
    }
  );
};

module.exports = connectarBD;
