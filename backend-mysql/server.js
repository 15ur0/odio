require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, Materia, Nota } = require('./src/models');

const app = express();
app.use(cors());
app.use(express.json());

// Simple mock login for demo (replace with real auth)
app.post('/auth/login', (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) return res.status(400).json({ error: 'email and role required' });
  return res.json({ token: 'demo-token', user: { email, role } });
});

// Materias
app.get('/materias', async (req, res) => {
  const materias = await Materia.findAll({ order: [['id','DESC']] });
  res.json(materias);
});

app.post('/materias', async (req, res) => {
  const { nome, professor } = req.body;
  if (!nome) return res.status(400).json({ error: 'nome required' });
  const m = await Materia.create({ nome, professor });
  res.status(201).json(m);
});

// Notas - media calculada no servidor: NP1 40%, NP2 40%, PIM 20%
function calcMedia(np1, np2, pim) {
  const n1 = parseFloat(np1) || 0;
  const n2 = parseFloat(np2) || 0;
  const p = parseFloat(pim) || 0;
  return +(n1 * 0.4 + n2 * 0.4 + p * 0.2).toFixed(2);
}

app.get('/notas', async (req, res) => {
  const where = {};
  if (req.query.materiaId) where.materiaId = req.query.materiaId;
  if (req.query.alunoId) where.alunoId = req.query.alunoId;
  const notas = await Nota.findAll({ where, order: [['id','DESC']] });
  res.json(notas);
});

app.post('/notas', async (req, res) => {
  const { materiaId, alunoId, np1, np2, pim } = req.body;
  if (!materiaId || !alunoId) return res.status(400).json({ error: 'materiaId and alunoId required' });
  const media = calcMedia(np1, np2, pim);
  const nota = await Nota.create({ materiaId, alunoId, np1, np2, pim, media });
  res.status(201).json(nota);
});

// Sync DB and start
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log('DB synced');
  app.listen(PORT, () => console.log('Server running on port', PORT));
}).catch(err => {
  console.error('Failed to sync DB:', err);
});
