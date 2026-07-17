import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="boards-page">
        <h1>Page not found</h1>
        <p>That board or page does not exist.</p>
        <p>
          <Link to="/" className="app-header__link" style={{ background: 'var(--trello-blue)', color: '#fff', display: 'inline-block', marginTop: 12 }}>
            Back to boards
          </Link>
        </p>
      </main>
    </>
  );
}
