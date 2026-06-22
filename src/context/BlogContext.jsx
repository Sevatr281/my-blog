import { createContext, useContext, useMemo, useState } from 'react';

const BlogContext = createContext(null);

function getInitialLikes() {
  try {
    return JSON.parse(localStorage.getItem('blogLikedArticles')) || {};
  } catch {
    return {};
  }
}

function getInitialComments() {
  try {
    return JSON.parse(localStorage.getItem('blogComments')) || {};
  } catch {
    return {};
  }
}

export function BlogProvider({ children }) {
  const [likes, setLikes] = useState(getInitialLikes);
  const [commentsByArticle, setCommentsByArticle] = useState(getInitialComments);

  function toggleLike(articleId) {
    setLikes((currentLikes) => {
      const nextLikes = { ...currentLikes };

      if (nextLikes[articleId]) {
        delete nextLikes[articleId];
      } else {
        nextLikes[articleId] = true;
      }

      localStorage.setItem('blogLikedArticles', JSON.stringify(nextLikes));
      return nextLikes;
    });
  }

  function addComment(articleId, comment) {
    setCommentsByArticle((currentComments) => {
      const nextComments = {
        ...currentComments,
        [articleId]: [...(currentComments[articleId] || []), comment]
      };

      localStorage.setItem('blogComments', JSON.stringify(nextComments));
      return nextComments;
    });
  }

  const value = useMemo(
    () => ({ likes, commentsByArticle, toggleLike, addComment }),
    [likes, commentsByArticle]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export function useBlog() {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error('useBlog нужно использовать внутри BlogProvider');
  }

  return context;
}
