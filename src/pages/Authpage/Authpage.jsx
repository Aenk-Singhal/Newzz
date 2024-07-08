import { Container, Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import Auth from '../../components/Auth/Auth'

const Authpage = () => {
  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} px={4}>
      <Container maxW={'container.md'} padding={0}>
        <Auth />
      </Container>
    </Flex>
  )
}

export default Authpage
