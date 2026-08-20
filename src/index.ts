import express from 'express';
import type {Request, Response} from "express";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const PORT = 3000;
app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [
  {
    id: 1,
    nombre: "Carlos Pérez",
    email: "carlos@gmail.com",
    bootcamp: "PERN"
  },
  {
    id: 2,
    nombre: "María López",
    email: "maria@gmail.com",
    bootcamp: "PERN"
  },
  {
    id: 3,
    nombre: "José Torres",
    email: "jose@gmail.com",
    bootcamp: "PERN"
  },
  {
    id: 4,
    nombre: "Ana Rodríguez",
    email: "ana@gmail.com",
    bootcamp: "PERN"
  },
  {
    id: 5,
    nombre: "Luis Vargas",
    email: "luis@gmail.com",
    bootcamp: "PERN"
  }
];

app.get("/api/estudiantes", (req: Request, res: Response) => {
  res.json(estudiantes);
});


app.post("/api/estudiantes", (req: Request, res: Response) => {
  const { nombre, email, bootcamp } = req.body;

  if (!email) {
    return res.status(400).json({
      mensaje: "El email es obligatorio"
    });
  }

  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length + 1,
    nombre,
    email,
    bootcamp
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json(nuevoEstudiante);
});


app.put("/api/estudiantes/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const estudiante = estudiantes.find(est => est.id === id);

  if (!estudiante) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado"
    });
  }

  const { nombre, email, bootcamp } = req.body;

  estudiante.nombre = nombre;
  estudiante.email = email;
  estudiante.bootcamp = bootcamp;

  res.json(estudiante);
});


app.delete("/api/estudiantes/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const indice = estudiantes.findIndex(est => est.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado"
    });
  }

  const estudianteEliminado = estudiantes.splice(indice, 1);

  res.json(estudianteEliminado[0]);
});

app.get('/api/status', (req:Request,res:Response) => {
  res.json({
    status: 'Servidor en línea',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

