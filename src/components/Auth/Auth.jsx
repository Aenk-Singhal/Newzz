import { Box, VStack, Image, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import GoogleAuth from './GoogleAuth'

const Auth = () => {
  return (
    <>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <VStack>
          <Image src="/logo.png" w={500} cursor={'pointer'} alt="Newzz" />

          <GoogleAuth/>
        </VStack>
      </Box>
    </>
  )
}

export default Auth
