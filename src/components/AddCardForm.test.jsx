import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { seedBoards } from '../data/seed.js';
import { STORAGE_KEY } from '../utils/boardOps.js';
import { renderWithProviders } from '../test/render.jsx';
import AddCardForm from './AddCardForm.jsx';
import AddListForm from './AddListForm.jsx';

const boardId = seedBoards[0].id;
const listId = seedBoards[0].lists[0].id;

describe('AddCardForm', () => {
  it('adds a card after submitting a title', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddCardForm boardId={boardId} listId={listId} />);
    await user.click(screen.getByRole('button', { name: '+ Add a card' }));
    await user.type(screen.getByPlaceholderText('Enter a title for this card…'), 'Covered by tests');
    await user.click(screen.getByRole('button', { name: 'Add card' }));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const cards = stored.find((board) => board.id === boardId).lists[0].cards;
    expect(cards.at(-1).title).toBe('Covered by tests');
  });

  it('does not add a blank card', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddCardForm boardId={boardId} listId={listId} />);
    const before = JSON.parse(localStorage.getItem(STORAGE_KEY))[0].lists[0].cards.length;
    await user.click(screen.getByRole('button', { name: '+ Add a card' }));
    await user.click(screen.getByRole('button', { name: 'Add card' }));
    const after = JSON.parse(localStorage.getItem(STORAGE_KEY))[0].lists[0].cards.length;
    expect(after).toBe(before);
  });
});

describe('AddListForm', () => {
  it('adds a list to the board', async () => {
    const user = userEvent.setup();
    renderWithProviders(<AddListForm boardId={boardId} />);
    await user.click(screen.getByRole('button', { name: '+ Add another list' }));
    await user.type(screen.getByPlaceholderText('Enter list title…'), 'QA');
    await user.click(screen.getByRole('button', { name: 'Add list' }));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const lists = stored.find((board) => board.id === boardId).lists;
    expect(lists.at(-1).title).toBe('QA');
  });
});
