export default function About() {
  return (
    <main className="main-about" aria-labelledby="page-title">
      <h1 className="visually-hidden" id="page-title">Обо мне</h1>

      <section className="bio" id="bio-section" aria-labelledby="bio-title">
        <h2 className="title_h2" id="bio-title">Био</h2>

        <span className="poster">
          <img src="/images/poster.png" alt="Постер страницы обо мне" />
        </span>

        <p className="description">
          Моё имя — Всеволод, но меня чаще называют просто Володя. Я студент
          группы ПМИ-24. Увлекаюсь программированием, работой с нейросетями,
          творчеством и всем понемногу. В свободное время стараюсь уделять
          внимание своим хобби, друзьям и активному отдыху. Звёзд с неба не хватаю,
          но всегда стараюсь учиться и развиваться в разных областях. В будущем
          планирую продолжать развиваться в IT-сфере и построить на этом карьеру.
        </p>
      </section>

      <section className="skills" aria-labelledby="skills-title">
        <h2 className="title_h2" id="skills-title">Навыки</h2>
        <div className="list-skills">
          <h3>Программирование и разработка</h3>
          <ul>
            <li>Основы программирования и разработки приложений</li>
            <li>Работа с API</li>
            <li>Работа с LLM</li>
            <li>Базовое понимание архитектуры проектов</li>
            <li>HTML и базовая семантика</li>
          </ul>

          <h3>Инструменты разработки</h3>
          <ul>
            <li>Git: ветвление, работа с удалёнными репозиториями, просмотр истории</li>
            <li>Работа с виртуальными окружениями: venv</li>
            <li>Базовая настройка среды разработки</li>
          </ul>

          <h3>Операционные системы</h3>
          <ul>
            <li>Работа с Linux на примере Fedora KDE</li>
            <li>Базовая настройка системы и интерфейса</li>
          </ul>

          <h3>Общие навыки</h3>
          <ul>
            <li>Умение разбираться в новых технологиях</li>
            <li>Поиск и анализ информации</li>
            <li>Самостоятельное обучение</li>
          </ul>
        </div>
      </section>

      <aside className="goals" aria-labelledby="goals-title">
        <h2 className="title_h2" id="goals-title">Текущие цели</h2>
        <div className="goals-content">
          <p>Получить высшее образование и начать работу в области IT.</p>
        </div>
      </aside>
    </main>
  );
}
