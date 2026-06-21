import { useState } from 'react';
import { useBlog } from '../context/BlogContext.jsx';

export default function CommentForm({ articleId }) {
  const { addComment } = useBlog();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedText = text.trim();

    if (trimmedName.length < 2) {
      setMessage({ type: 'error', text: 'Имя должно быть не короче 2 символов.' });
      return;
    }

    if (trimmedText.length < 3) {
      setMessage({ type: 'error', text: 'Комментарий слишком короткий.' });
      return;
    }

    addComment(articleId, {
      id: crypto.randomUUID(),
      name: trimmedName,
      text: trimmedText,
      date: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    });

    setName('');
    setText('');
    setMessage({ type: 'success', text: 'Комментарий добавлен.' });
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label>
        Имя
        <input
          type="text"
          name="commentName"
          placeholder="Твоё имя"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Комментарий
        <textarea
          name="commentText"
          placeholder="Напиши комментарий"
          required
          minLength="3"
          maxLength="300"
          rows="3"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <button type="submit">Добавить</button>
      <p className={`form-message ${message.type}`} aria-live="polite">{message.text}</p>
    </form>
  );
}
