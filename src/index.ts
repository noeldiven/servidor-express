import express from "express";
import cors from "cors";
import estudiantesRouter from "./routes/estudiantes.js";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json" with { type: "json" };

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.json({ mensaje: "API de estudiantes funcionando correctamente" });
});

app.use("/api/estudiantes", estudiantesRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});