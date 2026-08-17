import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { STORAGE_KEY } from '../utils/boardOps.js';
import { renderWithProviders } from '../test/render.jsx';
import BoardCard from './BoardCard.jsx';

const board = {
  id: 'board-product',
  title: 'Product Roadmap',
  background: '#0079bf',
  starred: true,
};

describe('BoardCard', () => {
  it('links to the board page', () => {
    renderWithProviders(<BoardCard board={board} />);
    expect(screen.getByRole('link', { name: 'Product Roadmap' })).toHaveAttribute(
      'href',
      '/board/board-product',
    );
  });

  it('stars and unstars through board state', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BoardCard board={board} />);
    await user.click(screen.getByRole('button', { name: 'Unstar Product Roadmap' }));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored.find((item) => item.id === 'board-product').starred).toBe(false);
  });
});
