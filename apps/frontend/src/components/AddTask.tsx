import { useState, type FormEvent } from 'react';

interface Props {
  onAdd: (title: string) => Promise<void>;
  disabled: boolean;
}

export function AddTask({ onAdd, disabled }: Props) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Title cannot be empty.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onAdd(trimmed);
      setTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task-input"
        placeholder="New task title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={disabled || loading}
        maxLength={120}
      />
      <button
        type="submit"
        className="btn btn-add"
        disabled={disabled || loading}
      >
        {loading ? '…' : '+ Add'}
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
