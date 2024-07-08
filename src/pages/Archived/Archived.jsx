import { Container, Box } from '@chakra-ui/react'
import React from 'react'
import AArticles from '../../components/Articles/AArticles'

const Archived = () => {
  return (
    <Container maxW={'container.2xl'} mt={'20px'}>
      <Box p={10}>
        <AArticles />
      </Box>
    </Container>
  )
}

export default Archived
