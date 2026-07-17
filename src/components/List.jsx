import { useState } from 'react';
import { useBoards } from '../context/BoardContext.jsx';
import AddCardForm from './AddCardForm.jsx';
import Card from './Card.jsx';
import './List.css';

export default function List({ boardId, list, onOpenCard }) {
  const { renameList } = useBoards();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  const saveTitle = () => {
    if (title.trim()) renameList(boardId, list.id, title);
    else setTitle(list.title);
    setEditing(false);
  };

  return (
    <section className="kanban-list">
      <header className="kanban-list__header">
        {editing ? (
          <input
            className="kanban-list__title-input"
            value={title}
            autoFocus
            onChange={(event) => setTitle(event.target.value)}
            onBlur={saveTitle}
            onKeyDown={(event) => {
              if (event.key === 'Enter') saveTitle();
              if (event.key === 'Escape') {
                setTitle(list.title);
                setEditing(false);
              }
            }}
          />
        ) : (
          <h3 onClick={() => setEditing(true)}>{list.title}</h3>
        )}
        <span className="kanban-list__count">{list.cards.length}</span>
      </header>
      <div className="kanban-list__cards">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} onOpen={onOpenCard} />
        ))}
      </div>
      <AddCardForm boardId={boardId} listId={list.id} />
    </section>
  );
}
