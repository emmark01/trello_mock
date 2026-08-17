import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { BoardProvider } from '../context/BoardContext.jsx';
import { renderWithProviders } from './render.jsx';

function Probe() {
  return <p>Ready</p>;
}

describe('renderWithProviders', () => {
  it('wraps UI in the board provider and router', () => {
    renderWithProviders(<Probe />);
    expect(screen.getByText('Ready')).toBeInTheDocument();
  });

  it('still allows a plain render for comparison', () => {
    render(
      <MemoryRouter>
        <BoardProvider>
          <Probe />
        </BoardProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText('Ready')).toBeInTheDocument();
  });
});
