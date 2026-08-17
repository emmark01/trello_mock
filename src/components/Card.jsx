import { useBoards } from '../context/BoardContext.jsx';
import { formatDue, isOverdue } from '../utils/dates.js';
import Avatar from './Avatar.jsx';
import LabelBadge from './LabelBadge.jsx';
import './Card.css';

export default function Card({ card, onOpen, dragHandleProps }) {
  const { labels } = useBoards();
  const due = formatDue(card.dueDate);
  const overdue = isOverdue(card.dueDate);
  const checklistDone = card.checklist.filter((item) => item.done).length;
  const checklistTotal = card.checklist.length;

  return (
    <article className="kanban-card" {...dragHandleProps}>
      <button type="button" className="kanban-card__button" onClick={() => onOpen(card)}>
        {card.labelIds.length > 0 && (
          <div className="kanban-card__labels">
            {card.labelIds.map((labelId) => (
              <LabelBadge key={labelId} labelId={labelId} />
            ))}
          </div>
        )}
        <h4>{card.title}</h4>
        <div className="kanban-card__meta">
          {due && (
            <span className={`kanban-card__due ${overdue ? 'is-overdue' : ''}`}>
              {due}
            </span>
          )}
          {checklistTotal > 0 && (
            <span className="kanban-card__check">
              {checklistDone}/{checklistTotal}
            </span>
          )}
          {card.comments > 0 && <span className="kanban-card__icon">{card.comments} comments</span>}
          {card.attachments > 0 && (
            <span className="kanban-card__icon">{card.attachments} files</span>
          )}
          {card.labelIds.length > 0 && (
            <span className="visually-hidden">
              Labels: {card.labelIds.map((id) => labels.find((label) => label.id === id)?.name).join(', ')}
            </span>
          )}
        </div>
        {card.memberIds.length > 0 && (
          <div className="avatar-stack kanban-card__members">
            {card.memberIds.map((memberId) => (
              <Avatar key={memberId} memberId={memberId} size={24} />
            ))}
          </div>
        )}
      </button>
    </article>
  );
}
