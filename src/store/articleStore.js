import { create } from 'zustand'

const useArticleStore = create((set) => ({
  articles: [],
  createArticle: (article) =>
    set((state) => ({ articles: [article, ...state.articles] })),
  setArticles: (articles) => set({ articles }),
  deleteArticle: (id) =>
    set((state) => ({
      articles: state.articles.filter((articles) => articles.id !== id),
    })),
}))

export default useArticleStore
