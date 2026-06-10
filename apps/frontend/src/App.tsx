import { useState, useEffect, useCallback } from 'react';
import type { Task } from '@kanban/shared';
import { api } from './api/tasks';
import { Column } from './components/Column';
import { AddTask } from './components/AddTask';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false); // per-action lock

  // ── Fetch all tasks ─────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getAll();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ── Add task ────────────────────────────────────────────────
  const handleAdd = async (title: string) => {
    const created = await api.create(title);
    setTasks((prev) => [...prev, created]);
  };

  // ── Move task (toggle status) ───────────────────────────────
  const handleMove = async (task: Task) => {
    setBusy(true);
    try {
      const newStatus = task.status === 'todo' ? 'done' : 'todo';
      const updated = await api.updateStatus(task.id, newStatus);
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task.');
    } finally {
      setBusy(false);
    }
  };

  // ── Delete task ─────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    setBusy(true);
    try {
      await api.remove(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task.');
    } finally {
      setBusy(false);
    }
  };

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <h1>📋 Kanban Board</h1>
        <p className="app-subtitle">Drag tasks to Done or back to To Do</p>
      </header>

      {/* ── Add task ── */}
      <div className="add-task-wrapper">
        <AddTask onAdd={handleAdd} disabled={loading || busy} />
      </div>

      {/* ── Global error ── */}
      {error && (
        <div className="global-error" role="alert">
          <span>{error}</span>
          <button onClick={() => setError('')} className="dismiss">✕</button>
        </div>
      )}

      {/* ── Board ── */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading tasks…</p>
        </div>
      ) : (
        <main className="board">
          <Column
            title="To Do"
            tasks={todoTasks}
            onMove={handleMove}
            onDelete={handleDelete}
            disabled={busy}
            accent="#f59e0b"
          />
          <Column
            title="Done"
            tasks={doneTasks}
            onMove={handleMove}
            onDelete={handleDelete}
            disabled={busy}
            accent="#22c55e"
          />
        </main>
      )}
    </div>
  );
}
