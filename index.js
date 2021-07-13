const debug = require("debug")("usuaris:principal");
const connectarBD = require("./bd");
const iniciaServidor = require("./servidor");

connectarBD(() => iniciaServidor());
