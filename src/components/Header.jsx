import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header>
      <div className="wrapper">
        <NavLink to="/" className="logo-link" aria-label="На главную" onClick={closeMenu}>
          <img src="/images/logo.png" alt="Логотип" className="logo" />
        </NavLink>

        <nav className={`nav ${isOpen ? 'nav_open' : ''}`} aria-label="Основная навигация">
          <button
            className="burger"
            type="button"
            aria-label="Открыть меню"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? '×' : '☰'}
          </button>

          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" onClick={closeMenu}>Главная</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" onClick={closeMenu}>Обо мне</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contacts" onClick={closeMenu}>Контакты</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
