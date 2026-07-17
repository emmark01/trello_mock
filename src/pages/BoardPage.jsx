import { useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useBoards } from '../context/BoardContext.jsx';

export default function BoardPage() {
  const { boardId } = useParams();
  const { getBoard } = useBoards();
  const board = getBoard(boardId);

  if (!board) {
    return (
      <>
        <Header />
        <main className="boards-page">
          <h1>Board not found</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <h1>{board.title}</h1>
      </main>
    </>
  );
}
