const burgerButton = document.querySelector('.burger');
const nav = document.querySelector('.nav');

if (burgerButton && nav) {
    burgerButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav_open');
        burgerButton.setAttribute('aria-expanded', String(isOpen));
        burgerButton.textContent = isOpen ? '×' : '☰';
    });
}

const storage = {
    get(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch {
            return fallback;
        }
    },

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

function escapeHTML(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function initArticleFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    const posts = document.querySelectorAll('.post[data-category]');

    if (!filterButtons.length || !posts.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.filter;

            filterButtons.forEach((item) => item.classList.remove('active'));
            button.classList.add('active');

            posts.forEach((post) => {
                const shouldShow = selectedCategory === 'all' || post.dataset.category === selectedCategory;
                post.classList.toggle('is-hidden', !shouldShow);
            });
        });
    });
}

function initLikes() {
    const likeButtons = document.querySelectorAll('.post[data-article-id] .like-button');
    if (!likeButtons.length) return;

    const likedArticles = storage.get('blogLikedArticles', {});

    likeButtons.forEach((button) => {
        const article = button.closest('.post');
        const articleId = article.dataset.articleId;

        function renderLike() {
            const isLiked = Boolean(likedArticles[articleId]);
            button.classList.toggle('liked', isLiked);
            button.setAttribute('aria-pressed', String(isLiked));
            button.textContent = isLiked ? '♥ Лайкнуто' : '♡ Лайк';
        }

        renderLike();

        button.addEventListener('click', () => {
            likedArticles[articleId] = !likedArticles[articleId];

            if (!likedArticles[articleId]) {
                delete likedArticles[articleId];
            }

            storage.set('blogLikedArticles', likedArticles);
            renderLike();
        });
    });
}

function initComments() {
    const posts = document.querySelectorAll('.post[data-article-id]');
    if (!posts.length) return;

    posts.forEach((post) => {
        const articleId = post.dataset.articleId;
        const form = post.querySelector('.comment-form');
        const list = post.querySelector('.comments-list');
        const message = post.querySelector('.form-message');

        if (!form || !list) return;

        const storageKey = `blogComments:${articleId}`;
        let comments = storage.get(storageKey, []);

        function renderComments() {
            if (!comments.length) {
                list.innerHTML = '<li>Комментариев пока нет.</li>';
                return;
            }

            list.innerHTML = comments.map((comment) => `
                <li>
                    <strong class="comment-author">${escapeHTML(comment.name)}</strong>
                    <span>${escapeHTML(comment.text)}</span>
                    <small class="comment-date">${escapeHTML(comment.date)}</small>
                </li>
            `).join('');
        }

        renderComments();

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nameInput = form.elements.commentName;
            const textInput = form.elements.commentText;
            const name = nameInput.value.trim();
            const text = textInput.value.trim();

            message.className = 'form-message';

            if (name.length < 2) {
                message.textContent = 'Имя должно быть не короче 2 символов.';
                message.classList.add('error');
                nameInput.focus();
                return;
            }

            if (text.length < 3) {
                message.textContent = 'Комментарий слишком короткий.';
                message.classList.add('error');
                textInput.focus();
                return;
            }

            comments.push({
                name,
                text,
                date: new Date().toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            });

            storage.set(storageKey, comments);
            renderComments();
            form.reset();

            message.textContent = 'Комментарий добавлен.';
            message.classList.add('success');
        });
    });
}

function initContactValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const message = form.querySelector('.contact-form-message');

    function clearErrors() {
        form.querySelectorAll('.field-error').forEach((item) => item.remove());
        form.querySelectorAll('.has-error').forEach((item) => item.classList.remove('has-error'));
        if (message) {
            message.textContent = '';
            message.className = 'contact-form-message';
        }
    }

    function showError(field, text) {
        const wrapper = field.closest('.form-field') || field.closest('.form-checkbox');
        if (wrapper) wrapper.classList.add('has-error');

        const error = document.createElement('p');
        error.className = 'field-error';
        error.textContent = text;

        if (wrapper) {
            wrapper.append(error);
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors();

        const name = form.elements.name;
        const email = form.elements.email;
        const topic = form.elements.topic;
        const text = form.elements.message;
        const agreement = form.elements.agreement;
        const errors = [];
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (name.value.trim().length < 2) {
            errors.push([name, 'Имя должно быть не короче 2 символов.']);
        }

        if (!emailPattern.test(email.value.trim())) {
            errors.push([email, 'Введите нормальную почту, например inbox@mail.ru.']);
        }

        if (!topic.value) {
            errors.push([topic, 'Выберите тему сообщения.']);
        }

        if (text.value.trim().length < 10) {
            errors.push([text, 'Сообщение должно быть не короче 10 символов.']);
        }

        if (!agreement.checked) {
            errors.push([agreement, 'Нужно согласиться на обработку данных.']);
        }

        if (errors.length) {
            errors.forEach(([field, textError]) => showError(field, textError));
            if (message) {
                message.textContent = 'Проверь поля формы.';
                message.classList.add('error');
            }
            errors[0][0].focus();
            return;
        }

        if (message) {
            message.textContent = 'Форма заполнена правильно. На сервер ничего не отправляем — это учебная версия.';
            message.classList.add('success');
        }

        form.reset();
    });
}

initArticleFilters();
initLikes();
initComments();
initContactValidation();
