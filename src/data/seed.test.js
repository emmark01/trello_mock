import { describe, expect, it } from 'vitest';
import { labels, members, seedBoards } from '../data/seed.js';

describe('seed data', () => {
  it('includes unique members with initials', () => {
    const ids = members.map((member) => member.id);
    expect(new Set(ids).size).toBe(members.length);
    members.forEach((member) => {
      expect(member.initials).toHaveLength(2);
      expect(member.color).toMatch(/^#/);
    });
  });

  it('includes unique labels', () => {
    const ids = labels.map((label) => label.id);
    expect(new Set(ids).size).toBe(labels.length);
    expect(labels.map((label) => label.name)).toEqual(
      expect.arrayContaining(['Feature', 'Bug', 'Design']),
    );
  });

  it('seeds at least four boards with lists and cards', () => {
    expect(seedBoards.length).toBeGreaterThanOrEqual(4);
    seedBoards.forEach((board) => {
      expect(board.lists.length).toBeGreaterThan(0);
      board.lists.forEach((list) => {
        list.cards.forEach((card) => {
          expect(card).toMatchObject({
            id: expect.any(String),
            title: expect.any(String),
            labelIds: expect.any(Array),
            memberIds: expect.any(Array),
          });
        });
      });
    });
  });

  it('stars the product and marketing boards', () => {
    const starred = seedBoards.filter((board) => board.starred).map((board) => board.id);
    expect(starred).toEqual(expect.arrayContaining(['board-product', 'board-marketing']));
  });
});
