import { Router, Request, Response } from 'express';
import type { CreateTaskBody, UpdateTaskBody } from '@kanban/shared';
import pool from '../db';

const router = Router();

// ── GET /tasks ─────────────────────────────────────────────────
router.get('/', async (_req: Request, res: Response) => {
  const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
  res.status(200).json(rows);
});

// ── POST /tasks ────────────────────────────────────────────────
router.post('/', async (req: Request<{}, {}, CreateTaskBody>, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'Title must not be empty.' });
    return;
  }

  const { rows } = await pool.query(
    "INSERT INTO tasks (title, status) VALUES ($1, 'todo') RETURNING *",
    [title.trim()],
  );
  res.status(201).json(rows[0]);
});

// ── PUT /tasks/:id ─────────────────────────────────────────────
router.put('/:id', async (req: Request<{ id: string }, {}, UpdateTaskBody>, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (!['todo', 'done'].includes(status)) {
    res.status(400).json({ error: 'Status must be "todo" or "done".' });
    return;
  }

  const { rows } = await pool.query(
    'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
    [status, id],
  );

  if (rows.length === 0) {
    res.status(404).json({ error: `Task with id ${id} not found.` });
    return;
  }

  res.status(200).json(rows[0]);
});

// ── DELETE /tasks/:id ──────────────────────────────────────────
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);

  if (rowCount === 0) {
    res.status(404).json({ error: `Task with id ${id} not found.` });
    return;
  }

  res.status(200).json({ message: `Task ${id} deleted.` });
});

export default router;
