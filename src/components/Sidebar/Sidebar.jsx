import React from 'react'
import { Box, Button, Flex, Image, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import useLogout from '../hooks/useLogout'
import SidebarItems from './SidebarItems'

const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout()

  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.300'}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={4}
    >
      <Flex
        direction={'column'}
        gap={10}
        loading
        w="full"
        height={'full'}
        cursor="pointer"
      >
        <Link
          to={'/'}
          as={RouterLink}
          pl={2}
          display={'block'}
          cursor="pointer"
        >
          <Image src="/logo.png" cursor={'pointer'} alt="Newzz" />
        </Link>
        <Flex direction={'column'} gap={5} cursor={'pointer'}>
          <SidebarItems />
        </Flex>
        <Flex
          onClick={handleLogout}
          alignItems={'center'}
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
          p={2}
          w={'full'}
          justifyContent={'flex-start'}
          mt={'auto'}
        >
          <Button
            display={'block'}
            variant={'ghost'}
            _hover={{ bg: 'transparent' }}
            isLoading={isLoggingOut}
          >
            Log Out
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Sidebar
