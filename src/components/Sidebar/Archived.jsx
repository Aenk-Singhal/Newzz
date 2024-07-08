import { Box, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Archived = () => {
  return (
    <Link
      display={'flex'}
      to={'/archived'}
      as={RouterLink}
      alignItems={'center'}
      gap={4}
      _hover={{ bg: 'whiteAlpha.400' }}
      borderRadius={6}
      p={2}
      w={'full'}
      justifyContent={'flex-start'}
    >
      <Box display={'block'}>Archived</Box>
    </Link>
  )
}

export default Archived
