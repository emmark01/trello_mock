import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../test/render.jsx';
import Card from './Card.jsx';

const card = {
  id: 'c-test',
  title: 'Ship the checklist',
  description: '',
  labelIds: ['l-feature', 'l-urgent'],
  memberIds: ['m1'],
  dueDate: '2020-01-01',
  checklist: [
    { id: 'ch1', text: 'Write', done: true },
    { id: 'ch2', text: 'Review', done: false },
  ],
  comments: 2,
  attachments: 1,
};

describe('Card', () => {
  it('renders title, labels, checklist, and members', () => {
    renderWithProviders(<Card card={card} onOpen={() => {}} />);
    expect(screen.getByText('Ship the checklist')).toBeInTheDocument();
    expect(screen.getByTitle('Feature')).toBeInTheDocument();
    expect(screen.getByTitle('Urgent')).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument();
    expect(screen.getByText('2 comments')).toBeInTheDocument();
    expect(screen.getByText('1 files')).toBeInTheDocument();
    expect(screen.getByTitle('Alex Chen')).toBeInTheDocument();
    expect(screen.getByText(/Labels: Feature, Urgent/)).toBeInTheDocument();
  });

  it('marks an overdue due date', () => {
    renderWithProviders(<Card card={card} onOpen={() => {}} />);
    expect(document.querySelector('.kanban-card__due')).toHaveClass('is-overdue');
  });

  it('calls onOpen when clicked', async () => {
    const onOpen = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<Card card={card} onOpen={onOpen} />);
    await user.click(screen.getByRole('button'));
    expect(onOpen).toHaveBeenCalledWith(card);
  });
});
