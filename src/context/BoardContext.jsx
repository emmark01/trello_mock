import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { labels, members, seedBoards } from '../data/seed';

const STORAGE_KEY = 'trello-ui-boards';
const BoardContext = createContext(null);

const clone = (value) => JSON.parse(JSON.stringify(value));

const loadBoards = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt storage */
  }
  return clone(seedBoards);
};

const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState(loadBoards);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
  }, [boards]);

  const value = useMemo(() => {
    const getBoard = (boardId) => boards.find((board) => board.id === boardId);

    const createBoard = ({ title, background, workspace }) => {
      const board = {
        id: uid('board'),
        title: title.trim() || 'Untitled board',
        background: background || '#0079bf',
        starred: false,
        workspace: workspace || 'Acme Inc',
        lists: [
          { id: uid('list'), title: 'To Do', cards: [] },
          { id: uid('list'), title: 'Doing', cards: [] },
          { id: uid('list'), title: 'Done', cards: [] },
        ],
      };
      setBoards((current) => [board, ...current]);
      return board;
    };

    const toggleStar = (boardId) => {
      setBoards((current) =>
        current.map((board) =>
          board.id === boardId ? { ...board, starred: !board.starred } : board,
        ),
      );
    };

    const addList = (boardId, title) => {
      setBoards((current) =>
        current.map((board) =>
          board.id === boardId
            ? {
                ...board,
                lists: [...board.lists, { id: uid('list'), title: title.trim(), cards: [] }],
              }
            : board,
        ),
      );
    };

    const addCard = (boardId, listId, title) => {
      const newCard = {
        id: uid('card'),
        title: title.trim(),
        description: '',
        labelIds: [],
        memberIds: [],
        dueDate: null,
        checklist: [],
        comments: 0,
        attachments: 0,
      };
      setBoards((current) =>
        current.map((board) =>
          board.id === boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list,
                ),
              }
            : board,
        ),
      );
    };

    const updateCard = (boardId, cardId, patch) => {
      setBoards((current) =>
        current.map((board) =>
          board.id === boardId
            ? {
                ...board,
                lists: board.lists.map((list) => ({
                  ...list,
                  cards: list.cards.map((item) =>
                    item.id === cardId ? { ...item, ...patch } : item,
                  ),
                })),
              }
            : board,
        ),
      );
    };

    const moveCard = (boardId, activeId, overListId, overCardId) => {
      setBoards((current) =>
        current.map((board) => {
          if (board.id !== boardId) return board;

          let moving = null;
          const listsWithoutCard = board.lists.map((list) => {
            const index = list.cards.findIndex((item) => item.id === activeId);
            if (index === -1) return list;
            moving = list.cards[index];
            return { ...list, cards: list.cards.filter((item) => item.id !== activeId) };
          });

          if (!moving) return board;

          return {
            ...board,
            lists: listsWithoutCard.map((list) => {
              if (list.id !== overListId) return list;
              const cards = [...list.cards];
              const overIndex = overCardId
                ? cards.findIndex((item) => item.id === overCardId)
                : cards.length;
              const insertAt = overIndex === -1 ? cards.length : overIndex;
              cards.splice(insertAt, 0, moving);
              return { ...list, cards };
            }),
          };
        }),
      );
    };

    const renameList = (boardId, listId, title) => {
      setBoards((current) =>
        current.map((board) =>
          board.id === boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === listId ? { ...list, title: title.trim() } : list,
                ),
              }
            : board,
        ),
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
