import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from '../test/render.jsx';
import FilterBar from './FilterBar.jsx';

describe('FilterBar', () => {
  it('emits search, label, and member changes', async () => {
    const onQueryChange = vi.fn();
    const onLabelChange = vi.fn();
    const onMemberChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <FilterBar
        query=""
        onQueryChange={onQueryChange}
        labelId=""
        onLabelChange={onLabelChange}
        memberId=""
        onMemberChange={onMemberChange}
      />,
    );

    await user.type(screen.getByPlaceholderText('Search cards'), 'login');
    expect(onQueryChange).toHaveBeenCalled();

    await user.selectOptions(screen.getByLabelText('Filter by label'), 'l-bug');
    expect(onLabelChange).toHaveBeenCalledWith('l-bug');

    await user.selectOptions(screen.getByLabelText('Filter by member'), 'm1');
    expect(onMemberChange).toHaveBeenCalledWith('m1');
  });

  it('toggles a label from the legend', async () => {
    const onLabelChange = vi.fn();
    const user = userEvent.setup();
    renderWithProviders(
      <FilterBar
        query=""
        onQueryChange={() => {}}
        labelId="l-bug"
        onLabelChange={onLabelChange}
        memberId=""
        onMemberChange={() => {}}
      />,
    );
    await user.click(screen.getByTitle('Bug').closest('button'));
    expect(onLabelChange).toHaveBeenCalledWith('');
  });
});
