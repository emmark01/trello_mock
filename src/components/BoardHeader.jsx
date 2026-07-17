import { useBoards } from '../context/BoardContext.jsx';
import Avatar from './Avatar.jsx';
import './BoardHeader.css';

export default function BoardHeader({ board, onToggleMenu, onToggleFilter, filterOpen }) {
  const { toggleStar, members } = useBoards();
  const memberIds = [...new Set(board.lists.flatMap((list) => list.cards.flatMap((card) => card.memberIds)))];

  return (
    <div className="board-header">
      <h1>{board.title}</h1>
      <button
        type="button"
        className={`board-header__star ${board.starred ? 'is-starred' : ''}`}
        aria-label={board.starred ? 'Unstar board' : 'Star board'}
        onClick={() => toggleStar(board.id)}
      >
        ★
      </button>
      <span className="board-header__workspace">{board.workspace}</span>
      <div className="avatar-stack board-header__members">
        {memberIds.map((memberId) => (
          <Avatar key={memberId} memberId={memberId} />
        ))}
        {memberIds.length === 0 &&
          members.slice(0, 3).map((member) => <Avatar key={member.id} memberId={member.id} />)}
      </div>
      <div className="board-header__spacer" />
      <button
        type="button"
        className={`board-header__btn ${filterOpen ? 'is-active' : ''}`}
        onClick={onToggleFilter}
      >
        Filter
      </button>
      <button type="button" className="board-header__btn" onClick={onToggleMenu}>
        Show menu
      </button>
    </div>
  );
}
