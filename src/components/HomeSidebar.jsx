import { Link } from 'react-router-dom';
import { useBoards } from '../context/BoardContext.jsx';
import './HomeSidebar.css';

export default function HomeSidebar({ onCreate }) {
  const { boards } = useBoards();
  const starred = boards.filter((board) => board.starred);
  const workspaces = [...new Set(boards.map((board) => board.workspace))];

  return (
    <aside className="home-sidebar">
      <nav>
        <Link to="/" className="home-sidebar__link is-active">
          Boards
        </Link>
        <p className="home-sidebar__label">Starred</p>
        {starred.map((board) => (
          <Link key={board.id} to={`/board/${board.id}`} className="home-sidebar__board">
            <span className="home-sidebar__swatch" style={{ background: board.background }} />
            {board.title}
          </Link>
        ))}
        <p className="home-sidebar__label">Workspaces</p>
        {workspaces.map((workspace) => (
          <div key={workspace} className="home-sidebar__workspace">
            {workspace}
          </div>
        ))}
        <button type="button" className="home-sidebar__create" onClick={onCreate}>
          Create board
        </button>
      </nav>
    </aside>
  );
}
