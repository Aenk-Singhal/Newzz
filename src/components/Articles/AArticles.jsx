import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import Article from './Article'
import useGetArticles from '../hooks/useGetArticles'
import useAuthStore from '../../store/authStore'

const AArticles = () => {
  const { isLoading, articles } = useGetArticles()
  const authUser = useAuthStore((state) => state.user)

  return (
    <SimpleGrid columns={4} gap={10}>
      {articles.map((article) =>
        article.archived && article.createdBy === authUser.uid ? (
          <Article article={article} key={article.id} />
        ) : null
      )}
    </SimpleGrid>
  )
}

export default AArticles
