import Header from '../components/Header.jsx';
import { useBoards } from '../context/BoardContext.jsx';
import './BoardsPage.css';

export default function BoardsPage() {
  const { boards } = useBoards();
  const workspaces = [...new Set(boards.map((board) => board.workspace))];

  return (
    <>
      <Header />
      <main className="boards-page">
        <h1 className="boards-page__title">Your boards</h1>
        {workspaces.map((workspace) => (
          <section key={workspace} className="boards-page__section">
            <h2>{workspace}</h2>
            <div className="boards-page__grid">
              {boards
                .filter((board) => board.workspace === workspace)
                .map((board) => (
                  <article key={board.id} className="board-tile-placeholder">
                    {board.title}
                  </article>
                ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
