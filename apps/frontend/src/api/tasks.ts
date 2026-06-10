import type { Task, TaskStatus } from '@kanban/shared';

const BASE = '/tasks';

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) {
    throw new Error((data as { error?: string }).error ?? `HTTP ${res.status}`);
  }
  return data as T;
}

export const api = {
  getAll: (): Promise<Task[]> =>
    fetch(BASE).then((r) => handleResponse<Task[]>(r)),

  create: (title: string): Promise<Task> =>
    fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    }).then((r) => handleResponse<Task>(r)),

  updateStatus: (id: number, status: TaskStatus): Promise<Task> =>
    fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).then((r) => handleResponse<Task>(r)),

  remove: (id: number): Promise<void> =>
    fetch(`${BASE}/${id}`, { method: 'DELETE' }).then((r) =>
      handleResponse<void>(r)
    ),
};
