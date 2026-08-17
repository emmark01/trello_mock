import { describe, expect, it } from 'vitest';
import { filterBoardLists, filterBoards, filterCards } from './filters.js';

const boards = [
  { id: '1', title: 'Product Roadmap', workspace: 'Acme Inc' },
  { id: '2', title: 'Personal Tasks', workspace: 'Personal' },
];

const cards = [
  { id: 'c1', title: 'Fix login bug', labelIds: ['l-bug'], memberIds: ['m1'] },
  { id: 'c2', title: 'New onboarding', labelIds: ['l-feature'], memberIds: ['m2'] },
  { id: 'c3', title: 'Login analytics', labelIds: ['l-research', 'l-bug'], memberIds: ['m1', 'm2'] },
];

describe('filterBoards', () => {
  it('returns all boards when the query is empty', () => {
    expect(filterBoards(boards, '  ')).toHaveLength(2);
  });

  it('matches title or workspace', () => {
    expect(filterBoards(boards, 'personal').map((board) => board.id)).toEqual(['2']);
    expect(filterBoards(boards, 'acme').map((board) => board.id)).toEqual(['1']);
  });
});

describe('filterCards', () => {
  it('filters by title', () => {
    expect(filterCards(cards, { query: 'login' }).map((card) => card.id)).toEqual(['c1', 'c3']);
  });

  it('filters by label and member together', () => {
    expect(filterCards(cards, { labelId: 'l-bug', memberId: 'm2' }).map((card) => card.id)).toEqual([
      'c3',
    ]);
  });
});

describe('filterBoardLists', () => {
  it('returns null when there is no board', () => {
    expect(filterBoardLists(null, { query: 'x' })).toBeNull();
  });

  it('keeps lists while filtering their cards', () => {
    const board = {
      id: 'b1',
      lists: [
        { id: 'l1', title: 'Todo', cards },
        { id: 'l2', title: 'Done', cards: [] },
      ],
    };
    const result = filterBoardLists(board, { query: 'analytics' });
    expect(result.lists).toHaveLength(2);
    expect(result.lists[0].cards.map((card) => card.id)).toEqual(['c3']);
    expect(result.lists[1].cards).toEqual([]);
  });
});
