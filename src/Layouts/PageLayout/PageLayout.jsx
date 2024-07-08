import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'

const PageLayout = ({ children }) => {
  const { pathname } = useLocation()
  const [user, loading, error] = useAuthState(auth)
  const canRenderSidebar = pathname !== '/auth' && user
  return (
    <Flex>
      {canRenderSidebar ? (
        <Box w={'240px'}>
          <Sidebar />
        </Box>
      ) : null}
      <Box flex={1} w={'calc(100% - 240px)'}>
        {children}
      </Box>
    </Flex>
  )
}

export default PageLayout
