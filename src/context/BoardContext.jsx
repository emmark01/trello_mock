import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { labels, members, seedBoards } from '../data/seed';
import {
  STORAGE_KEY,
  addCardToList,
  addListToBoard,
  createEmptyBoard,
  loadBoards,
  mapBoard,
  moveCardInBoard,
  renameListOnBoard,
  toggleStarOnBoards,
  updateCardOnBoard,
} from '../utils/boardOps.js';

const BoardContext = createContext(null);

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState(() => loadBoards(localStorage, seedBoards));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
    } catch {
      /* ignore storage failures */
    }
  }, [boards]);

  const value = useMemo(() => {
    const getBoard = (boardId) => boards.find((board) => board.id === boardId);

    const createBoard = (input) => {
      const board = createEmptyBoard(input);
      setBoards((current) => [board, ...current]);
      return board;
    };

    const toggleStar = (boardId) => {
      setBoards((current) => toggleStarOnBoards(current, boardId));
    };

    const addList = (boardId, title) => {
      setBoards((current) => mapBoard(current, boardId, (board) => addListToBoard(board, title)));
    };

    const addCard = (boardId, listId, title) => {
      setBoards((current) => mapBoard(current, boardId, (board) => addCardToList(board, listId, title)));
    };

    const updateCard = (boardId, cardId, patch) => {
      setBoards((current) =>
        mapBoard(current, boardId, (board) => updateCardOnBoard(board, cardId, patch)),
      );
    };

    const moveCard = (boardId, activeId, overListId, overCardId) => {
      setBoards((current) =>
        mapBoard(current, boardId, (board) => moveCardInBoard(board, activeId, overListId, overCardId)),
      );
    };

    const renameList = (boardId, listId, title) => {
      setBoards((current) =>
        mapBoard(current, boardId, (board) => renameListOnBoard(board, listId, title)),
      );
    };

    return {
      boards,
      members,
      labels,
      getBoard,
      createBoard,
      toggleStar,
      addList,
      addCard,
      updateCard,
      moveCard,
      renameList,
    };
  }, [boards]);

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoards() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoards must be used within BoardProvider');
  }
  return context;
}
