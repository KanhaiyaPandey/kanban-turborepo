import express from 'express';
import cors from 'cors';
import taskRouter from './routes/tasks';

const app = express();
const PORT = process.env.PORT ?? 4000;

// ── Middleware ─────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────
app.use('/tasks', taskRouter);

// ── Health check ───────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── 404 handler ────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── Start ──────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});

export default app;
