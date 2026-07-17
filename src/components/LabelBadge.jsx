import { useBoards } from '../context/BoardContext.jsx';
import './LabelBadge.css';

export default function LabelBadge({ labelId, expanded = false }) {
  const { labels } = useBoards();
  const label = labels.find((item) => item.id === labelId);
  if (!label) return null;

  return (
    <span
      className={`label-badge label-badge--${label.color} ${expanded ? 'is-expanded' : ''}`}
      title={label.name}
    >
      {expanded ? label.name : ''}
    </span>
  );
}
