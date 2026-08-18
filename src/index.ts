import express from 'express';
import type {Request, Response} from "express";
import fs from "node:fs/promises";
import path from "node:path";

const app = express();
const PORT = 3000;

app.get('/api/status', (req:Request,res:Response) => {
  res.json({
    status: 'Servidor en línea',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
