import { useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import BoardCard from '../components/BoardCard.jsx';
import CreateBoardModal from '../components/CreateBoardModal.jsx';
import HomeSidebar from '../components/HomeSidebar.jsx';
import { useBoards } from '../context/BoardContext.jsx';
import { filterBoards } from '../utils/filters.js';
import './BoardsPage.css';

export default function BoardsPage() {
  const { boards } = useBoards();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const visibleBoards = useMemo(() => filterBoards(boards, search), [boards, search]);

  const starred = visibleBoards.filter((board) => board.starred);
  const workspaces = [...new Set(visibleBoards.map((board) => board.workspace))];

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />
      <div className="boards-layout">
        <HomeSidebar onCreate={() => setOpen(true)} />
        <main className="boards-page">
        {starred.length > 0 && (
          <section className="boards-page__section">
            <h2>Starred boards</h2>
            <div className="boards-page__grid">
              {starred.map((board) => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          </section>
        )}
        {workspaces.map((workspace) => (
          <section key={workspace} className="boards-page__section">
            <h2>{workspace}</h2>
            <div className="boards-page__grid">
              {visibleBoards
                .filter((board) => board.workspace === workspace)
                .map((board) => (
                  <BoardCard key={board.id} board={board} />
                ))}
              <button type="button" className="create-board-tile" onClick={() => setOpen(true)}>
                Create new board
              </button>
            </div>
          </section>
        ))}
        </main>
      </div>
      <CreateBoardModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
