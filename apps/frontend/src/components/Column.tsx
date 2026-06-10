import type { Task } from '@kanban/shared';
import { TaskCard } from './TaskCard';

interface Props {
  title: string;
  tasks: Task[];
  onMove: (task: Task) => void;
  onDelete: (id: number) => void;
  disabled: boolean;
  accent: string;
}

export function Column({ title, tasks, onMove, onDelete, disabled, accent }: Props) {
  return (
    <div className="column">
      <div className="column-header" style={{ borderTopColor: accent }}>
        <h2>{title}</h2>
        <span className="task-count" style={{ backgroundColor: accent }}>
          {tasks.length}
        </span>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks here yet.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={onMove}
              onDelete={onDelete}
              disabled={disabled}
            />
          ))
        )}
      </div>
    </div>
  );
}
