import { Router, Request, Response } from 'express';
import type { CreateTaskBody, UpdateTaskBody } from '@kanban/shared';
import { tasks, getNextId } from '../store';

const router = Router();

// ── GET /tasks ─────────────────────────────────────────────────
// Returns all tasks
router.get('/', (_req: Request, res: Response) => {
  res.status(200).json(tasks);
});

// ── POST /tasks ────────────────────────────────────────────────
// Creates a new task with default status "todo"
router.post('/', (req: Request<{}, {}, CreateTaskBody>, res: Response) => {
  const { title } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'Title must not be empty.' });
    return;
  }

  const task = {
    id: getNextId(),
    title: title.trim(),
    status: 'todo' as const,
  };

  tasks.push(task);
  res.status(201).json(task);
});

// ── PUT /tasks/:id ─────────────────────────────────────────────
// Updates the status of an existing task
router.put('/:id', (req: Request<{ id: string }, {}, UpdateTaskBody>, res: Response) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  if (!['todo', 'done'].includes(status)) {
    res.status(400).json({ error: 'Status must be "todo" or "done".' });
    return;
  }

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    res.status(404).json({ error: `Task with id ${id} not found.` });
    return;
  }

  task.status = status;
  res.status(200).json(task);
});

// ── DELETE /tasks/:id ──────────────────────────────────────────
// Deletes a task by ID
router.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    res.status(404).json({ error: `Task with id ${id} not found.` });
    return;
  }

  tasks.splice(index, 1);
  res.status(200).json({ message: `Task ${id} deleted.` });
});

export default router;
