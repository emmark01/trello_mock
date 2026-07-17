import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoards } from '../context/BoardContext.jsx';
import './CreateBoardModal.css';

const BACKGROUNDS = ['#0079bf', '#519839', '#b04632', '#89609e', '#d29034', '#00aecc', '#4bbf6b', '#838c91'];

export default function CreateBoardModal({ open, onClose }) {
  const { createBoard } = useBoards();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [workspace, setWorkspace] = useState('Acme Inc');

  if (!open) return null;

  const handleCreate = (event) => {
    event.preventDefault();
    const board = createBoard({ title, background, workspace });
    setTitle('');
    onClose();
    navigate(`/board/${board.id}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="create-board-modal"
        role="dialog"
        aria-labelledby="create-board-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="create-board-title">Create board</h2>
        <div className="create-board-modal__preview" style={{ background }}>
          {title || 'Board title'}
        </div>
        <form onSubmit={handleCreate}>
          <fieldset>
            <legend>Background</legend>
            <div className="create-board-modal__swatches">
              {BACKGROUNDS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={color === background ? 'is-selected' : ''}
                  style={{ background: color }}
                  aria-label={`Choose ${color}`}
                  onClick={() => setBackground(color)}
                />
              ))}
            </div>
          </fieldset>
          <label>
            Board title
            <input
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              autoFocus
            />
          </label>
          <label>
            Workspace
            <select value={workspace} onChange={(event) => setWorkspace(event.target.value)}>
              <option>Acme Inc</option>
              <option>Personal</option>
            </select>
          </label>
          <div className="create-board-modal__actions">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
