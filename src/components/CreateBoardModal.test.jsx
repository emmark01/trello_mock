import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../test/render.jsx';
import CreateBoardModal from './CreateBoardModal.jsx';

describe('CreateBoardModal', () => {
  it('renders nothing when closed', () => {
    const { container } = renderWithProviders(
      <CreateBoardModal open={false} onClose={() => {}} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('creates a board and closes', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<CreateBoardModal open onClose={onClose} />, { route: '/' });
    await user.type(screen.getByLabelText('Board title'), 'Launch plan');
    await user.click(screen.getByRole('button', { name: 'Create' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('closes from cancel', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(<CreateBoardModal open onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onClose).toHaveBeenCalled();
  });
});
