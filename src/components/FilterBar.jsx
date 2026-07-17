import { useBoards } from '../context/BoardContext.jsx';
import LabelBadge from './LabelBadge.jsx';
import './FilterBar.css';

export default function FilterBar({ query, onQueryChange, labelId, onLabelChange, memberId, onMemberChange }) {
  const { labels, members } = useBoards();

  return (
    <div className="filter-bar">
      <input
        type="search"
        placeholder="Search cards"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <select value={labelId} onChange={(event) => onLabelChange(event.target.value)} aria-label="Filter by label">
        <option value="">All labels</option>
        {labels.map((label) => (
          <option key={label.id} value={label.id}>
            {label.name}
          </option>
        ))}
      </select>
      <select value={memberId} onChange={(event) => onMemberChange(event.target.value)} aria-label="Filter by member">
        <option value="">All members</option>
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.name}
          </option>
        ))}
      </select>
      <div className="filter-bar__legend">
        {labels.map((label) => (
          <button
            key={label.id}
            type="button"
            onClick={() => onLabelChange(labelId === label.id ? '' : label.id)}
          >
            <LabelBadge labelId={label.id} expanded />
          </button>
        ))}
      </div>
    </div>
  );
}
