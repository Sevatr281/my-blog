import { useBlog } from '../context/BlogContext.jsx';
import Comments from './Comments.jsx';

export default function Article({ article }) {
  const { likes, toggleLike } = useBlog();
  const isLiked = Boolean(likes[article.id]);

  return (
    <article aria-labelledby={`post-${article.id}`} className="post">
      <h3 id={`post-${article.id}`}>{article.title}</h3>

      {article.excerpt.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <span className="link">
        <a href="#" aria-label={`Читать статью ${article.title}`} onClick={(event) => event.preventDefault()}>
          Читать далее
        </a>
      </span>

      <div className="article-actions">
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          type="button"
          aria-pressed={isLiked}
          onClick={() => toggleLike(article.id)}
        >
          {isLiked ? '★' : '☆'} Лайк
        </button>
      </div>

      <Comments articleId={article.id} />
    </article>
  );
}
