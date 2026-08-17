import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../test/render.jsx';
import Avatar from './Avatar.jsx';

describe('Avatar', () => {
  it('renders nothing for an unknown member', () => {
    const { container } = renderWithProviders(<Avatar memberId="missing" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows member initials and name', () => {
    renderWithProviders(<Avatar memberId="m1" />);
    expect(screen.getByTitle('Alex Chen')).toHaveTextContent('AC');
  });

  it('applies the requested size', () => {
    renderWithProviders(<Avatar memberId="m2" size={40} />);
    expect(screen.getByTitle('Maya Patel')).toHaveStyle({ width: '40px', height: '40px' });
  });
});
