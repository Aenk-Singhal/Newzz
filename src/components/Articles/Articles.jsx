import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import Article from './Article'
import useGetArticles from '../hooks/useGetArticles'

const Articles = () => {
  const { isLoading, articles } = useGetArticles()

  console.log('Rendering article list...');
  return (
    <SimpleGrid columns={4} gap={10}>
      {articles.map((article) =>
        !article.archived ? (
          <Article article={article} key={article.id} />
        ) : null
      )}
    </SimpleGrid>
  )
}

export default Articles
