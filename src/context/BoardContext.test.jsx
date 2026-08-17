import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { seedBoards } from '../data/seed.js';
import { STORAGE_KEY } from '../utils/boardOps.js';
import { BoardProvider, useBoards } from './BoardContext.jsx';

function BoardProbe() {
  const { boards, getBoard, createBoard, toggleStar } = useBoards();
  const [createdId, setCreatedId] = useState('');
  const first = boards[0];

  return (
    <div>
      <p>count:{boards.length}</p>
      <p>first:{first?.title}</p>
      <p>starred:{String(first?.starred)}</p>
      <p>lookup:{getBoard(seedBoards[0].id)?.title ?? 'missing'}</p>
      <p>created:{createdId}</p>
      <button
        type="button"
        onClick={() => {
          const board = createBoard({ title: 'QA Board', background: '#b04632', workspace: 'Personal' });
          setCreatedId(board.id);
        }}
      >
        create
      </button>
      <button type="button" onClick={() => toggleStar(first.id)}>
        star
      </button>
    </div>
  );
}

function renderProbe() {
  return render(
    <BoardProvider>
      <BoardProbe />
    </BoardProvider>,
  );
}

describe('BoardProvider', () => {
  it('loads seed boards by default', () => {
    renderProbe();
    expect(screen.getByText(`count:${seedBoards.length}`)).toBeInTheDocument();
    expect(screen.getByText(`lookup:${seedBoards[0].title}`)).toBeInTheDocument();
  });

  it('creates a board at the front of the list', async () => {
    const user = userEvent.setup();
    renderProbe();
    await user.click(screen.getByRole('button', { name: 'create' }));
    expect(screen.getByText(`count:${seedBoards.length + 1}`)).toBeInTheDocument();
    expect(screen.getByText('first:QA Board')).toBeInTheDocument();
    expect(screen.getByText(/^created:board-/)).toBeInTheDocument();
  });

  it('toggles the starred flag', async () => {
    const user = userEvent.setup();
    renderProbe();
    const before = screen.getByText(/^starred:/).textContent;
    await user.click(screen.getByRole('button', { name: 'star' }));
    expect(screen.getByText(/^starred:/).textContent).not.toBe(before);
  });

  it('persists boards to localStorage', async () => {
    const user = userEvent.setup();
    renderProbe();
    await user.click(screen.getByRole('button', { name: 'create' }));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    expect(stored[0].title).toBe('QA Board');
  });
});

describe('useBoards', () => {
  it('throws outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    function Broken() {
      useBoards();
      return null;
    }
    expect(() => render(<Broken />)).toThrow('useBoards must be used within BoardProvider');
    spy.mockRestore();
  });
});
