export type TaskStatus = 'todo' | 'done';

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export interface CreateTaskBody {
  title: string;
}

export interface UpdateTaskBody {
  status: TaskStatus;
}

export interface ApiError {
  error: string;
}
