import './BoardSidebar.css';

export default function BoardSidebar({ board, open, onClose }) {
  if (!open) return null;

  const cardCount = board.lists.reduce((sum, list) => sum + list.cards.length, 0);

  return (
    <aside className="board-sidebar" aria-label="Board menu">
      <header>
        <h2>Menu</h2>
        <button type="button" onClick={onClose} aria-label="Close menu">
          ×
        </button>
      </header>
      <section>
        <h3>About this board</h3>
        <p>
          {board.title} lives in the {board.workspace} workspace. Use lists to move work from idea to
          done.
        </p>
      </section>
      <section>
        <h3>Activity</h3>
        <ul>
          <li>{board.lists.length} lists</li>
          <li>{cardCount} cards</li>
          <li>Background {board.background}</li>
        </ul>
      </section>
    </aside>
  );
}
