import { useState } from 'react';
import { useBoards } from '../context/BoardContext.jsx';
import './Composer.css';

export default function AddCardForm({ boardId, listId }) {
  const { addCard } = useBoards();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    addCard(boardId, listId, title);
    setTitle('');
  };

  if (!open) {
    return (
      <button type="button" className="composer-toggle" onClick={() => setOpen(true)}>
        + Add a card
      </button>
    );
  }

  return (
    <form className="composer" onSubmit={submit}>
      <textarea
        autoFocus
        rows={3}
        placeholder="Enter a title for this card…"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submit(event);
          }
          if (event.key === 'Escape') setOpen(false);
        }}
      />
      <div className="composer__actions">
        <button type="submit" className="btn-primary">
          Add card
        </button>
        <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}
