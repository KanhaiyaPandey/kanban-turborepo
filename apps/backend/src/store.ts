import type { Task } from '@kanban/shared';

let nextId = 1;

// Seed data so the UI has something to show on first load
export const tasks: Task[] = [
  { id: nextId++, title: 'Set up Turborepo', status: 'done' },
  { id: nextId++, title: 'Build Express API', status: 'done' },
  { id: nextId++, title: 'Write React frontend', status: 'todo' },
  { id: nextId++, title: 'Test the Kanban board', status: 'todo' },
];

export const getNextId = (): number => nextId++;
