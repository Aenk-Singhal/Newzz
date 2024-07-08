import { useState, useEffect } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'
import useShowToast from './useShowToast'

const useGetArticles = () => {
  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const showToast = useShowToast()

  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true)
      setArticles([])

      try {
        const q = query(collection(firestore, 'articles'))
        const querySnapshot = await getDocs(q)

        const articles = []
        querySnapshot.forEach((doc) => {
          articles.push({ ...doc.data(), id: doc.id })
        })
        articles.sort((a, b) => b.createdAt - a.createdAt)
        setArticles(articles)
      } catch (error) {
        showToast('Error', error.message, 'error')
        setArticles([])
      } finally {
        setIsLoading(false)
      }
    }
    getArticles()
  }, [setArticles, showToast, firestore])

  return { isLoading, articles }
}

export default useGetArticles
