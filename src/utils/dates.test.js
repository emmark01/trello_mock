import { afterEach, describe, expect, it, vi } from 'vitest';
import { formatDue, isOverdue } from './dates.js';

describe('formatDue', () => {
  it('returns null for empty values', () => {
    expect(formatDue(null)).toBeNull();
    expect(formatDue('')).toBeNull();
  });

  it('formats a date string', () => {
    const formatted = formatDue('2026-08-22');
    expect(formatted).toEqual(expect.any(String));
    expect(formatted).toMatch(/22/);
  });
});

describe('isOverdue', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns false when there is no due date', () => {
    expect(isOverdue(null)).toBe(false);
  });

  it('marks past dates overdue and today as on time', () => {
    const now = new Date(2026, 7, 17, 12, 0, 0);
    expect(isOverdue('2026-08-16', now)).toBe(true);
    expect(isOverdue('2026-08-17', now)).toBe(false);
    expect(isOverdue('2026-08-18', now)).toBe(false);
  });
});
