export const STORAGE_KEY = 'trello-ui-boards';

export function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function loadBoards(storage, seed) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt storage */
  }
  return clone(seed);
}

export function createEmptyBoard({ title, background, workspace }) {
  return {
    id: uid('board'),
    title: (title || '').trim() || 'Untitled board',
    background: background || '#0079bf',
    starred: false,
    workspace: workspace || 'Acme Inc',
    lists: [
      { id: uid('list'), title: 'To Do', cards: [] },
      { id: uid('list'), title: 'Doing', cards: [] },
      { id: uid('list'), title: 'Done', cards: [] },
    ],
  };
}

export function createCard(title) {
  return {
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
}

export function toggleStarOnBoards(boards, boardId) {
  return boards.map((board) =>
    board.id === boardId ? { ...board, starred: !board.starred } : board,
  );
}

export function addListToBoard(board, title) {
  return {
    ...board,
    lists: [...board.lists, { id: uid('list'), title: title.trim(), cards: [] }],
  };
}

export function addCardToList(board, listId, title) {
  const newCard = createCard(title);
  return {
    ...board,
    lists: board.lists.map((list) =>
      list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list,
    ),
  };
}

export function updateCardOnBoard(board, cardId, patch) {
  return {
    ...board,
    lists: board.lists.map((list) => ({
      ...list,
      cards: list.cards.map((item) => (item.id === cardId ? { ...item, ...patch } : item)),
    })),
  };
}

export function renameListOnBoard(board, listId, title) {
  return {
    ...board,
    lists: board.lists.map((list) =>
      list.id === listId ? { ...list, title: title.trim() } : list,
    ),
  };
}

export function moveCardInBoard(board, activeId, overListId, overCardId) {
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
      const overIndex = overCardId ? cards.findIndex((item) => item.id === overCardId) : cards.length;
      const insertAt = overIndex === -1 ? cards.length : overIndex;
      cards.splice(insertAt, 0, moving);
      return { ...list, cards };
    }),
  };
}

export function mapBoard(boards, boardId, updater) {
  return boards.map((board) => (board.id === boardId ? updater(board) : board));
}
