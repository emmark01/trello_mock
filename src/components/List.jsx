import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useBoards } from '../context/BoardContext.jsx';
import AddCardForm from './AddCardForm.jsx';
import SortableCard from './SortableCard.jsx';
import './List.css';

export default function List({ boardId, list, onOpenCard }) {
  const { renameList } = useBoards();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const { setNodeRef, isOver } = useDroppable({
    id: list.id,
    data: { type: 'list' },
  });

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
      <div
        className={`kanban-list__cards ${isOver ? 'is-over' : ''}`}
        ref={setNodeRef}
      >
        <SortableContext items={list.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          {list.cards.map((card) => (
            <SortableCard key={card.id} card={card} onOpen={onOpenCard} />
          ))}
        </SortableContext>
      </div>
      <AddCardForm boardId={boardId} listId={list.id} />
    </section>
  );
}
