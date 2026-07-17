import { Link } from 'react-router-dom';
import { useBoards } from '../context/BoardContext.jsx';
import './BoardCard.css';

export default function BoardCard({ board }) {
  const { toggleStar } = useBoards();

  return (
    <div className="board-card" style={{ background: board.background }}>
      <Link to={`/board/${board.id}`} className="board-card__link">
        <h3>{board.title}</h3>
      </Link>
      <button
        type="button"
        className={`board-card__star ${board.starred ? 'is-starred' : ''}`}
        aria-label={board.starred ? `Unstar ${board.title}` : `Star ${board.title}`}
        onClick={() => toggleStar(board.id)}
      >
        ★
      </button>
    </div>
  );
}
