import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../test/render.jsx';
import BoardsPage from './BoardsPage.jsx';

describe('BoardsPage', () => {
  it('renders starred boards and workspaces', () => {
    renderWithProviders(<BoardsPage />);
    expect(screen.getByRole('heading', { name: 'Starred boards' })).toBeInTheDocument();
    expect(screen.getAllByText('Product Roadmap').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('heading', { name: 'Acme Inc' }).length).toBeGreaterThan(0);
  });

  it('filters boards from the header search', async () => {
    const user = userEvent.setup();
    renderWithProviders(<BoardsPage />);
    await user.type(screen.getByLabelText('Search'), 'personal');
    expect(screen.queryByRole('heading', { name: 'Product Roadmap' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Personal Tasks' })).toBeInTheDocument();
  });
});
