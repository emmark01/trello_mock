import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BoardProvider } from '../context/BoardContext.jsx';

export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <BoardProvider>{ui}</BoardProvider>
    </MemoryRouter>,
    options,
  );
}
