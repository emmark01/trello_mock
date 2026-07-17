import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import AddListForm from '../components/AddListForm.jsx';
import BoardHeader from '../components/BoardHeader.jsx';
import BoardSidebar from '../components/BoardSidebar.jsx';
import Card from '../components/Card.jsx';
import CardModal from '../components/CardModal.jsx';
import FilterBar from '../components/FilterBar.jsx';
import Header from '../components/Header.jsx';
import List from '../components/List.jsx';
import { useBoards } from '../context/BoardContext.jsx';
import './BoardPage.css';

export default function BoardPage() {
  const { boardId } = useParams();
  const { getBoard, moveCard } = useBoards();
  const board = getBoard(boardId);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [labelId, setLabelId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [activeCard, setActiveCard] = useState(null);
  const [draggingCard, setDraggingCard] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

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

  const findListId = (id) => {
    if (!board) return null;
    if (board.lists.some((list) => list.id === id)) return id;
    return board.lists.find((list) => list.cards.some((card) => card.id === id))?.id ?? null;
  };

  const handleDragStart = ({ active }) => {
    const card = board.lists.flatMap((list) => list.cards).find((item) => item.id === active.id);
    setDraggingCard(card ?? null);
  };

  const handleDragEnd = ({ active, over }) => {
    setDraggingCard(null);
    if (!over || active.id === over.id) return;
    const fromList = findListId(active.id);
    const toList = findListId(over.id);
    if (!fromList || !toList) return;
    const overIsList = board.lists.some((list) => list.id === over.id);
    moveCard(board.id, active.id, toList, overIsList ? null : over.id);
  };

  const listTitle = activeCard
    ? board.lists.find((list) => list.cards.some((card) => card.id === activeCard.id))?.title
    : '';

  const liveCard = activeCard
    ? board.lists.flatMap((list) => list.cards).find((card) => card.id === activeCard.id)
    : null;

  return (
    <div className="board-page" style={{ background: board.background }}>
      <Header
        search={query}
        onSearchChange={(value) => {
          setQuery(value);
          setFilterOpen(true);
        }}
      />
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragCancel={() => setDraggingCard(null)}
          onDragEnd={handleDragEnd}
        >
          <div className="board-page__lists">
            {filteredBoard.lists.map((list) => (
              <List key={list.id} boardId={board.id} list={list} onOpenCard={setActiveCard} />
            ))}
            <AddListForm boardId={board.id} />
          </div>
          <DragOverlay>
            {draggingCard ? (
              <div className="drag-overlay-card">
                <Card card={draggingCard} onOpen={() => {}} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
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
