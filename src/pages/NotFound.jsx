import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1 className="big_title">Страница не найдена</h1>
      <Link className="back-link" to="/">Вернуться на главную</Link>
    </main>
  );
}
