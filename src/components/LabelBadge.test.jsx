import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../test/render.jsx';
import LabelBadge from './LabelBadge.jsx';

describe('LabelBadge', () => {
  it('renders nothing for an unknown label', () => {
    const { container } = renderWithProviders(<LabelBadge labelId="missing" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a compact badge by default', () => {
    renderWithProviders(<LabelBadge labelId="l-bug" />);
    const badge = screen.getByTitle('Bug');
    expect(badge).toHaveClass('label-badge--red');
    expect(badge).not.toHaveClass('is-expanded');
    expect(badge).toHaveTextContent('');
  });

  it('shows the label name when expanded', () => {
    renderWithProviders(<LabelBadge labelId="l-feature" expanded />);
    expect(screen.getByTitle('Feature')).toHaveTextContent('Feature');
    expect(screen.getByTitle('Feature')).toHaveClass('is-expanded');
  });
});
