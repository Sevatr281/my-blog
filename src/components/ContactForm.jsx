import { useState } from 'react';

const initialValues = {
  name: '',
  email: '',
  topic: '',
  message: '',
  agreement: false
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function validate() {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (values.name.trim().length < 2) {
      nextErrors.name = 'Имя должно быть не короче 2 символов.';
    }

    if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Введите нормальную почту, например inbox@mail.ru.';
    }

    if (!values.topic) {
      nextErrors.topic = 'Выберите тему сообщения.';
    }

    if (values.message.trim().length < 10) {
      nextErrors.message = 'Сообщение должно быть не короче 10 символов.';
    }

    if (!values.agreement) {
      nextErrors.agreement = 'Нужно согласиться на обработку данных.';
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormMessage({ type: 'error', text: 'Проверь поля формы.' });
      return;
    }

    setFormMessage({
      type: 'success',
      text: 'Форма заполнена правильно. На сервер ничего не отправляем — это учебная версия.'
    });
    setValues(initialValues);
  }

  return (
    <form className="contact-form" action="#" method="post" noValidate onSubmit={handleSubmit}>
      <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Введите имя"
          required
          minLength="2"
          maxLength="50"
          value={values.name}
          onChange={updateField}
        />
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor="email">Почта</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="inbox@mail.ru"
          required
          maxLength="400"
          value={values.email}
          onChange={updateField}
        />
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className={`form-field ${errors.topic ? 'has-error' : ''}`}>
        <label htmlFor="topic">Тема</label>
        <select name="topic" id="topic" required value={values.topic} onChange={updateField}>
          <option value="" disabled>Выберите тему</option>
          <option value="question">Вопрос</option>
          <option value="feedback">Отзыв</option>
          <option value="proposition">Предложение</option>
          <option value="collaboration">Сотрудничество</option>
        </select>
        {errors.topic && <p className="field-error">{errors.topic}</p>}
      </div>

      <div className={`form-field ${errors.message ? 'has-error' : ''}`}>
        <label htmlFor="message">Сообщение</label>
        <textarea
          name="message"
          id="message"
          placeholder="Введите сообщение"
          required
          maxLength="500"
          rows="6"
          value={values.message}
          onChange={updateField}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      <div className={`form-checkbox ${errors.agreement ? 'has-error' : ''}`}>
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          required
          checked={values.agreement}
          onChange={updateField}
        />
        <label htmlFor="agreement">Я согласен на обработку моих данных</label>
        {errors.agreement && <p className="field-error">{errors.agreement}</p>}
      </div>

      <button className="form-button" type="submit">Отправить</button>
      <p className={`contact-form-message ${formMessage.type}`} aria-live="polite">{formMessage.text}</p>
    </form>
  );
}
