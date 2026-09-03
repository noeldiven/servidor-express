import { Router } from "express";
import type { Request, Response } from "express";

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

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // #swagger.description = 'Obtiene la lista de estudiantes y permite filtrar por bootcamp'
  const bootcamp = req.query.bootcamp;

  if (bootcamp) {
    const estudiantesFiltrados = estudiantes.filter(
      est => est.bootcamp === bootcamp
    );

    return res.json(estudiantesFiltrados);
  }

  res.json(estudiantes);
});

router.get("/:id", (req: Request, res: Response) => {
  // #swagger.description = 'Obtiene un estudiante por su ID'
  const id = Number(req.params.id);

  const estudiante = estudiantes.find(est => est.id === id);

  if (!estudiante) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado"
    });
  }

  res.json(estudiante);
});

router.post("/", (req: Request, res: Response) => {
  // #swagger.description = 'Crea un nuevo estudiante'
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

router.put("/:id", (req: Request, res: Response) => {
  // #swagger.description = 'Actualiza los datos de un estudiante existente'
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

router.delete("/:id", (req: Request, res: Response) => {
  // #swagger.description = 'Elimina un estudiante por su ID'
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

export default router;
