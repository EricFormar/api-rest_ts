import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "./environments/.env"),
});

import { NODE_ENV, PORT } from "./env";

const app = express();
app.use(express.json());

app.get("/hello", (req, res) => {
  res.json("¡Hola, mundo!!!!");
});

try {
  app.listen(PORT, () => {
    console.log(
      `Servidor corriendo en el puerto ${PORT} | MODO: ${
        NODE_ENV ? NODE_ENV.toUpperCase() : "DEVELOPMENT (default)"
      }`
    );
  });
} catch (error) {
  console.error("\n ERROR: Error al iniciar la aplicación:", error);
  process.exit(1);
}
