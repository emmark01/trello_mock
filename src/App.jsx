import { Route, Routes } from 'react-router-dom';
import { BoardProvider } from './context/BoardContext.jsx';
import BoardsPage from './pages/BoardsPage.jsx';
import BoardPage from './pages/BoardPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <BoardProvider>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<BoardsPage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BoardProvider>
  );
}
