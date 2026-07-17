import { Link, useNavigate } from 'react-router-dom';
import { useBoards } from '../context/BoardContext.jsx';
import './Header.css';

export default function Header({ search, onSearchChange }) {
  const { boards } = useBoards();
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <div className="app-header__left">
        <Link to="/" className="app-header__logo" aria-label="Boards home">
          <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="currentColor" />
            <rect x="6" y="6" width="8" height="16" rx="1.5" fill="#026aa7" />
            <rect x="18" y="6" width="8" height="10" rx="1.5" fill="#026aa7" />
          </svg>
          <span>Trello</span>
        </Link>
        <nav className="app-header__nav">
          <Link to="/" className="app-header__link">
            Boards
          </Link>
          <select
            className="app-header__select"
            defaultValue=""
            aria-label="Recent boards"
            onChange={(event) => {
              if (event.target.value) navigate(`/board/${event.target.value}`);
              event.target.value = '';
            }}
          >
            <option value="" disabled>
              Recent
            </option>
            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>
        </nav>
      </div>
      <form
        className="app-header__search"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="visually-hidden" htmlFor="global-search">
          Search
        </label>
        <input
          id="global-search"
          type="search"
          placeholder="Search"
          value={search ?? ''}
          onChange={(event) => onSearchChange?.(event.target.value)}
        />
      </form>
      <div className="app-header__right">
        <span className="app-header__avatar" title="Alex Chen">
          AC
        </span>
      </div>
    </header>
  );
}
