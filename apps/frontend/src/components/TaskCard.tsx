import type { Task } from '@kanban/shared';

interface Props {
  task: Task;
  onMove: (task: Task) => void;
  onDelete: (id: number) => void;
  disabled: boolean;
}

export function TaskCard({ task, onMove, onDelete, disabled }: Props) {
  const isTodo = task.status === 'todo';

  return (
    <div className="task-card">
      <span className="task-title">{task.title}</span>
      <div className="task-actions">
        <button
          className={`btn btn-move ${isTodo ? 'btn-done' : 'btn-todo'}`}
          onClick={() => onMove(task)}
          disabled={disabled}
          title={isTodo ? 'Mark as Done' : 'Move back to To Do'}
        >
          {isTodo ? '✓ Done' : '↩ To Do'}
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(task.id)}
          disabled={disabled}
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
