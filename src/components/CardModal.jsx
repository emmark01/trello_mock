import { useEffect, useState } from 'react';
import { useBoards } from '../context/BoardContext.jsx';
import Avatar from './Avatar.jsx';
import LabelBadge from './LabelBadge.jsx';
import './CardModal.css';

export default function CardModal({ boardId, card, listTitle, onClose }) {
  const { labels, members, updateCard } = useBoards();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || '');

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description || '');
    setDueDate(card.dueDate || '');
  }, [card]);

  const save = (patch) => updateCard(boardId, card.id, patch);

  const toggleLabel = (labelId) => {
    const labelIds = card.labelIds.includes(labelId)
      ? card.labelIds.filter((id) => id !== labelId)
      : [...card.labelIds, labelId];
    save({ labelIds });
  };

  const toggleMember = (memberId) => {
    const memberIds = card.memberIds.includes(memberId)
      ? card.memberIds.filter((id) => id !== memberId)
      : [...card.memberIds, memberId];
    save({ memberIds });
  };

  const toggleCheck = (checkId) => {
    save({
      checklist: card.checklist.map((item) =>
        item.id === checkId ? { ...item, done: !item.done } : item,
      ),
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="card-modal"
        role="dialog"
        aria-labelledby="card-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="card-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <input
          id="card-modal-title"
          className="card-modal__title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={() => title.trim() && save({ title: title.trim() })}
        />
        <p className="card-modal__list">in list {listTitle}</p>
        <div className="card-modal__layout">
          <div className="card-modal__main">
            <section>
              <h3>Labels</h3>
              <div className="card-modal__chips">
                {card.labelIds.map((labelId) => (
                  <LabelBadge key={labelId} labelId={labelId} expanded />
                ))}
                {card.labelIds.length === 0 && <span className="muted">None</span>}
              </div>
            </section>
            <section>
              <h3>Members</h3>
              <div className="avatar-stack">
                {card.memberIds.map((memberId) => (
                  <Avatar key={memberId} memberId={memberId} />
                ))}
              </div>
            </section>
            <section>
              <h3>Due date</h3>
              <input
                type="date"
                value={dueDate}
                onChange={(event) => {
                  setDueDate(event.target.value);
                  save({ dueDate: event.target.value || null });
                }}
              />
            </section>
            <section>
              <h3>Description</h3>
              <textarea
                rows={5}
                placeholder="Add a more detailed description…"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                onBlur={() => save({ description })}
              />
            </section>
            {card.checklist.length > 0 && (
              <section>
                <h3>Checklist</h3>
                <ul className="card-modal__checks">
                  {card.checklist.map((item) => (
                    <li key={item.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleCheck(item.id)}
                        />
                        <span className={item.done ? 'is-done' : ''}>{item.text}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
          <aside className="card-modal__sidebar">
            <h3>Add to card</h3>
            <div className="card-modal__sidebar-group">
              {labels.map((label) => (
                <button
                  key={label.id}
                  type="button"
                  className={`sidebar-chip ${card.labelIds.includes(label.id) ? 'is-on' : ''}`}
                  onClick={() => toggleLabel(label.id)}
                >
                  <LabelBadge labelId={label.id} expanded />
                </button>
              ))}
            </div>
            <div className="card-modal__sidebar-group">
              {members.map((member) => (
                <button
                  key={member.id}
                  type="button"
                  className={`sidebar-member ${card.memberIds.includes(member.id) ? 'is-on' : ''}`}
                  onClick={() => toggleMember(member.id)}
                >
                  <Avatar memberId={member.id} size={24} />
                  {member.name}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
