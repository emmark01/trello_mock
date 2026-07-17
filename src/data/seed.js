export const members = [
  { id: 'm1', name: 'Alex Chen', initials: 'AC', color: '#61bd4f' },
  { id: 'm2', name: 'Maya Patel', initials: 'MP', color: '#c377e0' },
  { id: 'm3', name: 'Jordan Lee', initials: 'JL', color: '#0079bf' },
  { id: 'm4', name: 'Sam Rivera', initials: 'SR', color: '#eb5a46' },
  { id: 'm5', name: 'Riley Kim', initials: 'RK', color: '#ff9f1a' },
];

export const labels = [
  { id: 'l-feature', name: 'Feature', color: 'green' },
  { id: 'l-bug', name: 'Bug', color: 'red' },
  { id: 'l-design', name: 'Design', color: 'purple' },
  { id: 'l-research', name: 'Research', color: 'blue' },
  { id: 'l-urgent', name: 'Urgent', color: 'orange' },
  { id: 'l-ops', name: 'Ops', color: 'sky' },
];

const card = (partial) => ({
  description: '',
  labelIds: [],
  memberIds: [],
  dueDate: null,
  checklist: [],
  comments: 0,
  attachments: 0,
  ...partial,
});

export const seedBoards = [
  {
    id: 'board-product',
    title: 'Product Roadmap',
    background: '#0079bf',
    starred: true,
    workspace: 'Acme Inc',
    lists: [
      {
        id: 'list-backlog',
        title: 'Backlog',
        cards: [
          card({
            id: 'c1',
            title: 'Map onboarding funnel drop-off',
            description: 'Review analytics for the first-week experience and list the top three friction points.',
            labelIds: ['l-research'],
            memberIds: ['m2'],
            comments: 3,
          }),
          card({
            id: 'c2',
            title: 'Add saved filters to the board view',
            labelIds: ['l-feature'],
            memberIds: ['m1', 'm3'],
            dueDate: '2026-08-22',
          }),
          card({
            id: 'c3',
            title: 'Investigate slow card modal open',
            labelIds: ['l-bug'],
            memberIds: ['m4'],
            comments: 1,
          }),
        ],
      },
      {
        id: 'list-progress',
        title: 'In Progress',
        cards: [
          card({
            id: 'c4',
            title: 'Keyboard shortcuts for moving cards',
            description: 'Support j/k navigation and a move-to-list command palette.',
            labelIds: ['l-feature'],
            memberIds: ['m1'],
            dueDate: '2026-08-18',
            checklist: [
              { id: 'ch1', text: 'Define shortcut map', done: true },
              { id: 'ch2', text: 'Implement move command', done: false },
              { id: 'ch3', text: 'Add help overlay', done: false },
            ],
            comments: 5,
          }),
          card({
            id: 'c5',
            title: 'Empty-state illustrations for new boards',
            labelIds: ['l-design'],
            memberIds: ['m5'],
            attachments: 2,
          }),
        ],
      },
      {
        id: 'list-review',
        title: 'Review',
        cards: [
          card({
            id: 'c6',
            title: 'Label color contrast pass',
            labelIds: ['l-design', 'l-urgent'],
            memberIds: ['m2', 'm5'],
            dueDate: '2026-08-17',
            comments: 2,
          }),
        ],
      },
      {
        id: 'list-done',
        title: 'Done',
        cards: [
          card({
            id: 'c7',
            title: 'Workspace switcher in the header',
            labelIds: ['l-feature'],
            memberIds: ['m3'],
            dueDate: '2026-08-10',
          }),
          card({
            id: 'c8',
            title: 'Fix list title overflow on long names',
            labelIds: ['l-bug'],
            memberIds: ['m4'],
          }),
        ],
      },
    ],
  },
  {
    id: 'board-marketing',
    title: 'Marketing Campaign',
    background: '#519839',
    starred: true,
    workspace: 'Acme Inc',
    lists: [
      {
        id: 'list-ideas',
        title: 'Ideas',
        cards: [
          card({ id: 'c9', title: 'Launch teaser thread', labelIds: ['l-feature'], memberIds: ['m2'] }),
          card({ id: 'c10', title: 'Partner newsletter swap', labelIds: ['l-research'], memberIds: ['m5'] }),
        ],
      },
      {
        id: 'list-writing',
        title: 'Writing',
        cards: [
          card({
            id: 'c11',
            title: 'Landing page copy v2',
            labelIds: ['l-design'],
            memberIds: ['m2', 'm1'],
            dueDate: '2026-08-20',
            comments: 4,
          }),
        ],
      },
      {
        id: 'list-shipped',
        title: 'Shipped',
        cards: [
          card({ id: 'c12', title: 'Brand kit for contractors', labelIds: ['l-ops'], memberIds: ['m3'] }),
        ],
      },
    ],
  },
  {
    id: 'board-website',
    title: 'Website Redesign',
    background: '#89609e',
    starred: false,
    workspace: 'Acme Inc',
    lists: [
      {
        id: 'list-discover',
        title: 'Discover',
        cards: [
          card({ id: 'c13', title: 'Audit current IA', labelIds: ['l-research'], memberIds: ['m5'] }),
          card({ id: 'c14', title: 'Collect competitor screenshots', labelIds: ['l-design'], attachments: 6 }),
        ],
      },
      {
        id: 'list-build',
        title: 'Build',
        cards: [
          card({
            id: 'c15',
            title: 'New homepage hero',
            labelIds: ['l-feature', 'l-design'],
            memberIds: ['m1', 'm5'],
            dueDate: '2026-08-25',
            checklist: [
              { id: 'ch4', text: 'Wireframe', done: true },
              { id: 'ch5', text: 'Hi-fi mock', done: true },
              { id: 'ch6', text: 'Implement', done: false },
            ],
          }),
        ],
      },
    ],
  },
  {
    id: 'board-personal',
    title: 'Personal Tasks',
    background: '#d29034',
    starred: false,
    workspace: 'Personal',
    lists: [
      {
        id: 'list-todo',
        title: 'To Do',
        cards: [
          card({ id: 'c16', title: 'Renew domain', labelIds: ['l-ops'], dueDate: '2026-08-30' }),
          card({ id: 'c17', title: 'Read accessibility checklist', labelIds: ['l-research'] }),
        ],
      },
      {
        id: 'list-doing',
        title: 'Doing',
        cards: [
          card({ id: 'c18', title: 'Sketch side-project logo', labelIds: ['l-design'] }),
        ],
      },
    ],
  },
];
