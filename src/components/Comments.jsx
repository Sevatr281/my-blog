import { useBlog } from '../context/BlogContext.jsx';
import CommentForm from './CommentForm.jsx';

export default function Comments({ articleId }) {
  const { commentsByArticle } = useBlog();
  const comments = commentsByArticle[articleId] || [];

  return (
    <section className="comments" aria-labelledby={`comments-${articleId}`}>
      <h4 id={`comments-${articleId}`}>Комментарии</h4>
      <CommentForm articleId={articleId} />

      <ul className="comments-list">
        {comments.length === 0 ? (
          <li>Комментариев пока нет.</li>
        ) : (
          comments.map((comment) => (
            <li key={comment.id}>
              <strong className="comment-author">{comment.name}</strong>
              <span>{comment.text}</span>
              <small className="comment-date">{comment.date}</small>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
