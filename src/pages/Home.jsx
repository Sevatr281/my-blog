import { useEffect, useMemo, useState } from 'react';
import { getArticles } from '../api/articlesApi.js';
import ArticleFilters from '../components/ArticleFilters.jsx';
import ArticleList from '../components/ArticleList.jsx';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState('loading');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    let isMounted = true;

    getArticles()
      .then((loadedArticles) => {
        if (!isMounted) return;
        setArticles(loadedArticles);
        setStatus('success');
      })
      .catch(() => {
        if (!isMounted) return;
        setStatus('error');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return articles;
    return articles.filter((article) => article.category === selectedCategory);
  }, [articles, selectedCategory]);

  return (
    <main className="main-home">
      <h1 className="big_title">Добро пожаловать на мой блог!</h1>

      <section className="entry" aria-labelledby="welcome-title">
        <h2 id="welcome-title">Добро пожаловать!</h2>
        <p>
          Доброго времени суток, обывателям моей страницы! Это мой блог,
          в котором я собираюсь делиться с вами моими мыслями, идеями,
          опытом и всем, что мне покажется интересным. Приятного просмотра!
        </p>
      </section>

      <div className="container">
        <h2 id="latest-articles">Последние статьи</h2>
        <ArticleFilters selectedCategory={selectedCategory} onChange={setSelectedCategory} />

        {status === 'loading' && <p className="empty-state">Загружаем статьи...</p>}
        {status === 'error' && <p className="empty-state">Не получилось загрузить статьи.</p>}
        {status === 'success' && <ArticleList articles={filteredArticles} />}

        <aside className="extra-info" aria-labelledby="extra-title">
          <h2 id="extra-title">Дополнительно</h2>
          <p>На сайте также есть страница с биографией, навыками и контактной формой.</p>
        </aside>
      </div>
    </main>
  );
}
