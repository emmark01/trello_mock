export function filterBoards(boards, query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return boards;
  return boards.filter(
    (board) =>
      board.title.toLowerCase().includes(needle) ||
      board.workspace.toLowerCase().includes(needle),
  );
}

export function filterCards(cards, { query = '', labelId = '', memberId = '' } = {}) {
  const needle = query.trim().toLowerCase();
  return cards.filter((card) => {
    const matchesQuery = !needle || card.title.toLowerCase().includes(needle);
    const matchesLabel = !labelId || card.labelIds.includes(labelId);
    const matchesMember = !memberId || card.memberIds.includes(memberId);
    return matchesQuery && matchesLabel && matchesMember;
  });
}

export function filterBoardLists(board, filters) {
  if (!board) return null;
  return {
    ...board,
    lists: board.lists.map((list) => ({
      ...list,
      cards: filterCards(list.cards, filters),
    })),
  };
}
