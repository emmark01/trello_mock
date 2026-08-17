import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../test/render.jsx';
import NotFoundPage from './NotFoundPage.jsx';

describe('NotFoundPage', () => {
  it('explains the miss and links home', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to boards' })).toHaveAttribute('href', '/');
  });
});
