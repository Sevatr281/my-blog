import Article from './Article.jsx';

export default function ArticleList({ articles }) {
  if (!articles.length) {
    return <p className="empty-state">Статей в этой категории пока нет.</p>;
  }

  return (
    <section className="news" aria-labelledby="latest-articles">
      {articles.map((article) => (
        <Article article={article} key={article.id} />
      ))}
    </section>
  );
}
