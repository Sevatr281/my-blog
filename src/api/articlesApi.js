import articles from '../data/articles.json';

export function getArticles() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(articles), 350);
  });
}
