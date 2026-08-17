import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';

function renderApp(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App routes', () => {
  it('shows the boards home at /', () => {
    renderApp('/');
    expect(screen.getByRole('heading', { name: 'Starred boards' })).toBeInTheDocument();
  });

  it('shows a board by id', () => {
    renderApp('/board/board-product');
    expect(screen.getByRole('heading', { name: 'Product Roadmap' })).toBeInTheDocument();
    expect(screen.getByText('Backlog')).toBeInTheDocument();
  });

  it('shows not found for unknown routes', () => {
    renderApp('/missing');
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
  });

  it('shows not found for an unknown board', () => {
    renderApp('/board/does-not-exist');
    expect(screen.getByRole('heading', { name: 'Board not found' })).toBeInTheDocument();
  });
});
