import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../test/render.jsx';
import Header from './Header.jsx';

describe('Header', () => {
  it('links home and lists recent boards', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('link', { name: 'Boards home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Boards' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('option', { name: 'Product Roadmap' })).toBeInTheDocument();
  });

  it('notifies the parent when search changes', async () => {
    const onSearchChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<Header search="" onSearchChange={onSearchChange} />);
    await user.type(screen.getByLabelText('Search'), 'q');
    expect(onSearchChange).toHaveBeenCalledWith('q');
  });
});
