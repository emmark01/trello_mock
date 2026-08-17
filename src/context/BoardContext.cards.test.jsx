import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { seedBoards } from '../data/seed.js';
import { BoardProvider, useBoards } from './BoardContext.jsx';

const boardId = seedBoards[0].id;
const firstListId = seedBoards[0].lists[0].id;
const secondListId = seedBoards[0].lists[1].id;
const firstCardId = seedBoards[0].lists[0].cards[0].id;

function CardOpsProbe() {
  const { getBoard, addList, addCard, updateCard, moveCard, renameList } = useBoards();
  const board = getBoard(boardId);
  const firstList = board.lists[0];
  const secondList = board.lists[1];

  return (
    <div>
      <p>lists:{board.lists.length}</p>
      <p>listTitle:{firstList.title}</p>
      <p>cards:{firstList.cards.length}</p>
      <p>secondCards:{secondList.cards.length}</p>
      <p>cardTitle:{firstList.cards[0]?.title ?? 'gone'}</p>
      <p>lastCard:{firstList.cards.at(-1)?.title}</p>
      <button type="button" onClick={() => addList(boardId, 'QA')}>
        add-list
      </button>
      <button type="button" onClick={() => addCard(boardId, firstListId, 'From test')}>
        add-card
      </button>
      <button type="button" onClick={() => updateCard(boardId, firstCardId, { title: 'Renamed card' })}>
        update-card
      </button>
      <button type="button" onClick={() => renameList(boardId, firstListId, 'Icebox')}>
        rename-list
      </button>
      <button type="button" onClick={() => moveCard(boardId, firstCardId, secondListId, null)}>
        move-card
      </button>
    </div>
  );
}

function renderOps() {
  return render(
    <BoardProvider>
      <CardOpsProbe />
    </BoardProvider>,
  );
}

describe('BoardProvider card and list operations', () => {
  it('adds a list', async () => {
    const user = userEvent.setup();
    renderOps();
    const before = Number(screen.getByText(/^lists:/).textContent.replace('lists:', ''));
    await user.click(screen.getByRole('button', { name: 'add-list' }));
    expect(screen.getByText(`lists:${before + 1}`)).toBeInTheDocument();
  });

  it('adds a card to a list', async () => {
    const user = userEvent.setup();
    renderOps();
    await user.click(screen.getByRole('button', { name: 'add-card' }));
    expect(screen.getByText('lastCard:From test')).toBeInTheDocument();
  });

  it('updates a card title and renames a list', async () => {
    const user = userEvent.setup();
    renderOps();
    await user.click(screen.getByRole('button', { name: 'update-card' }));
    expect(screen.getByText('cardTitle:Renamed card')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'rename-list' }));
    expect(screen.getByText('listTitle:Icebox')).toBeInTheDocument();
  });

  it('moves a card to another list', async () => {
    const user = userEvent.setup();
    renderOps();
    const firstCount = Number(screen.getByText(/^cards:/).textContent.replace('cards:', ''));
    const secondCount = Number(screen.getByText(/^secondCards:/).textContent.replace('secondCards:', ''));
    await user.click(screen.getByRole('button', { name: 'move-card' }));
    expect(screen.getByText(`cards:${firstCount - 1}`)).toBeInTheDocument();
    expect(screen.getByText(`secondCards:${secondCount + 1}`)).toBeInTheDocument();
    expect(screen.getByText('cardTitle:Add saved filters to the board view')).toBeInTheDocument();
  });
});
