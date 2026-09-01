import express from "express";
import estudiantesRouter from "./routes/estudiantes.js";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json" with { type: "json" };

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/estudiantes", estudiantesRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});