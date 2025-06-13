import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(__dirname, "./environments/.env"),
});
import express, { NextFunction, Request, Response } from "express";
import { NODE_ENV, PORT } from "./env";

import brandRoutes from "./routes/brand.routes";
import categoryRoutes from "./routes/category.routes";
import sectionRoutes from "./routes/section.routes";
import productRoutes from "./routes/product.routes";
import subCategoryRoutes from "./routes/subcategory.routes";
import sequelizeConnection from "./database/connection";

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API RESTful con TypeScript y Express",
  });
});

app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/subcategories", subCategoryRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Recurso no encontrado",
  });
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    ok: false,
    message: "Error interno del servidor",
  });
});

// Database connection
sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

// Start server
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
