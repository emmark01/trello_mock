import { useState } from 'react';
import { useBoards } from '../context/BoardContext.jsx';
import './Composer.css';

export default function AddListForm({ boardId }) {
  const { addList } = useBoards();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    addList(boardId, title);
    setTitle('');
  };

  if (!open) {
    return (
      <button type="button" className="add-list-toggle" onClick={() => setOpen(true)}>
        + Add another list
      </button>
    );
  }

  return (
    <form className="composer add-list-form" onSubmit={submit}>
      <input
        autoFocus
        placeholder="Enter list title…"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
        }}
      />
      <div className="composer__actions">
        <button type="submit" className="btn-primary">
          Add list
        </button>
        <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
