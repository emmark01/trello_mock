export function formatDue(value) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function isOverdue(value, now = new Date()) {
  if (!value) return false;
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return new Date(`${value}T00:00:00`) < today;
}
