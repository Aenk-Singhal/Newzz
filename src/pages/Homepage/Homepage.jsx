import { Container, Box } from '@chakra-ui/react'
import React from 'react'
import Articles from '../../components/Articles/Articles'

const Homepage = () => {
  return (
    <Container maxW={'container.2xl'} mt={'20px'}>
      <Box p={10}>
        <Articles />
      </Box>
    </Container>
  )
}

export default Homepage
