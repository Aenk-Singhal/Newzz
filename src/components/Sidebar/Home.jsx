import React from 'react'
import { Box, Link } from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom'

const Home = () => {
  return (
    <Link
      display={'flex'}
      to={'/'}
      as={RouterLink}
      alignItems={'center'}
      gap={4}
      _hover={{ bg: 'whiteAlpha.400' }}
      borderRadius={6}
      p={2}
      w={'full'}
      justifyContent={'flex-start'}
    >
      <Box display={'block'}>Home</Box>
    </Link>
  )
}

export default Home
