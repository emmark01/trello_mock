import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddListForm from '../components/AddListForm.jsx';
import BoardHeader from '../components/BoardHeader.jsx';
import BoardSidebar from '../components/BoardSidebar.jsx';
import CardModal from '../components/CardModal.jsx';
import FilterBar from '../components/FilterBar.jsx';
import Header from '../components/Header.jsx';
import List from '../components/List.jsx';
import { useBoards } from '../context/BoardContext.jsx';
import './BoardPage.css';

export default function BoardPage() {
  const { boardId } = useParams();
  const { getBoard } = useBoards();
  const board = getBoard(boardId);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [labelId, setLabelId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [activeCard, setActiveCard] = useState(null);

  const filteredBoard = useMemo(() => {
    if (!board) return null;
    const needle = query.trim().toLowerCase();
    return {
      ...board,
      lists: board.lists.map((list) => ({
        ...list,
        cards: list.cards.filter((card) => {
          const matchesQuery = !needle || card.title.toLowerCase().includes(needle);
          const matchesLabel = !labelId || card.labelIds.includes(labelId);
          const matchesMember = !memberId || card.memberIds.includes(memberId);
          return matchesQuery && matchesLabel && matchesMember;
        }),
      })),
    };
  }, [board, query, labelId, memberId]);

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

  const listTitle = activeCard
    ? board.lists.find((list) => list.cards.some((card) => card.id === activeCard.id))?.title
    : '';

  const liveCard = activeCard
    ? board.lists.flatMap((list) => list.cards).find((card) => card.id === activeCard.id)
    : null;

  return (
    <div className="board-page" style={{ background: board.background }}>
      <Header />
      <BoardHeader
        board={board}
        filterOpen={filterOpen}
        onToggleFilter={() => setFilterOpen((value) => !value)}
        onToggleMenu={() => setMenuOpen((value) => !value)}
      />
      {filterOpen && (
        <FilterBar
          query={query}
          onQueryChange={setQuery}
          labelId={labelId}
          onLabelChange={setLabelId}
          memberId={memberId}
          onMemberChange={setMemberId}
        />
      )}
      <div className="board-page__body">
        <div className="board-page__lists">
          {filteredBoard.lists.map((list) => (
            <List key={list.id} boardId={board.id} list={list} onOpenCard={setActiveCard} />
          ))}
          <AddListForm boardId={board.id} />
        </div>
        <BoardSidebar board={board} open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
      {liveCard && (
        <CardModal
          boardId={board.id}
          card={liveCard}
          listTitle={listTitle}
          onClose={() => setActiveCard(null)}
        />
      )}
    </div>
  );
}
