import { describe, expect, it } from 'vitest';
import {
  STORAGE_KEY,
  addCardToList,
  addListToBoard,
  createCard,
  createEmptyBoard,
  loadBoards,
  moveCardInBoard,
  renameListOnBoard,
  toggleStarOnBoards,
  updateCardOnBoard,
} from './boardOps.js';

const sampleBoard = {
  id: 'b1',
  title: 'Roadmap',
  starred: false,
  lists: [
    {
      id: 'l1',
      title: 'Todo',
      cards: [
        { id: 'c1', title: 'One' },
        { id: 'c2', title: 'Two' },
      ],
    },
    {
      id: 'l2',
      title: 'Doing',
      cards: [{ id: 'c3', title: 'Three' }],
    },
  ],
};

describe('createEmptyBoard', () => {
  it('trims the title and adds default lists', () => {
    const board = createEmptyBoard({ title: '  Launch  ', background: '#519839', workspace: 'Personal' });
    expect(board.title).toBe('Launch');
    expect(board.background).toBe('#519839');
    expect(board.workspace).toBe('Personal');
    expect(board.lists.map((list) => list.title)).toEqual(['To Do', 'Doing', 'Done']);
    expect(board.starred).toBe(false);
  });

  it('falls back to Untitled board', () => {
    expect(createEmptyBoard({ title: '   ' }).title).toBe('Untitled board');
  });
});

describe('createCard', () => {
  it('creates an empty card with the given title', () => {
    const card = createCard('  Write tests  ');
    expect(card).toMatchObject({
      title: 'Write tests',
      description: '',
      labelIds: [],
      memberIds: [],
      dueDate: null,
      comments: 0,
    });
    expect(card.id).toMatch(/^card-/);
  });
});

describe('board mutations', () => {
  it('toggles a board star', () => {
    const next = toggleStarOnBoards([sampleBoard], 'b1');
    expect(next[0].starred).toBe(true);
  });

  it('adds a list and a card', () => {
    const withList = addListToBoard(sampleBoard, 'Review');
    expect(withList.lists.at(-1).title).toBe('Review');
    const withCard = addCardToList(sampleBoard, 'l1', 'New card');
    expect(withCard.lists[0].cards.at(-1).title).toBe('New card');
  });

  it('updates a card and renames a list', () => {
    expect(updateCardOnBoard(sampleBoard, 'c1', { title: 'Updated' }).lists[0].cards[0].title).toBe(
      'Updated',
    );
    expect(renameListOnBoard(sampleBoard, 'l1', 'Backlog').lists[0].title).toBe('Backlog');
  });

  it('moves a card to another list', () => {
    const moved = moveCardInBoard(sampleBoard, 'c1', 'l2', 'c3');
    expect(moved.lists[0].cards.map((card) => card.id)).toEqual(['c2']);
    expect(moved.lists[1].cards.map((card) => card.id)).toEqual(['c1', 'c3']);
  });

  it('appends a card when dropping on an empty list target', () => {
    const empty = {
      ...sampleBoard,
      lists: [
        sampleBoard.lists[0],
        { id: 'l2', title: 'Doing', cards: [] },
      ],
    };
    const moved = moveCardInBoard(empty, 'c2', 'l2', null);
    expect(moved.lists[1].cards.map((card) => card.id)).toEqual(['c2']);
  });

  it('returns the same board when the card is missing', () => {
    expect(moveCardInBoard(sampleBoard, 'missing', 'l2', null)).toBe(sampleBoard);
  });
});

describe('loadBoards', () => {
  it('reads stored boards when present', () => {
    const storage = {
      getItem: (key) => (key === STORAGE_KEY ? JSON.stringify([{ id: 'stored' }]) : null),
    };
    expect(loadBoards(storage, [{ id: 'seed' }])).toEqual([{ id: 'stored' }]);
  });

  it('falls back to a clone of seed data', () => {
    const seed = [{ id: 'seed' }];
    const loaded = loadBoards({ getItem: () => null }, seed);
    expect(loaded).toEqual(seed);
    expect(loaded).not.toBe(seed);
  });

  it('ignores corrupt storage', () => {
    const seed = [{ id: 'seed' }];
    expect(loadBoards({ getItem: () => '{' }, seed)).toEqual(seed);
  });
});
