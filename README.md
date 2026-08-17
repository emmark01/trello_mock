# Trello UI

A React kanban UI modeled after Trello: boards, lists, cards, labels, members, and drag-and-drop.

## Requirements

- **Node.js 20** (see `.nvmrc` and `engines` in `package.json`)
- npm 10+

```bash
nvm use
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm test` | Watch unit tests (Vitest) |
| `npm run test:run` | Run unit tests once |

## Features

- Boards home with workspaces, starred boards, and create-board flow
- Board view with lists, cards, filters, and a menu sidebar
- Card modal for description, labels, members, due date, and checklist
- Drag cards between lists
- State persisted in `localStorage`
