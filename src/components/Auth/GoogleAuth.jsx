import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../../firebase/firebase'
import useShowToast from '../hooks/useShowToast'
import useAuthStore from '../../store/authStore'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const GoogleAuth = () => {
  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth)
  const showToast = useShowToast()
  const loginUser = useAuthStore((state) => state.login)
  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle()
      if (!newUser && error) {
        showToast('Error', error.message, 'error')
        return
      }

      const userRef = doc(firestore, 'users', newUser.user.uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        const userDoc = userSnap.data()
        localStorage.setItem('user-info', JSON.stringify(userDoc))
        loginUser(userDoc)
      } else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          fullName: newUser.user.displayName,
          createdAt: Date.now(),
        }
        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc)
        localStorage.setItem('user-info', JSON.stringify(userDoc))
        loginUser(userDoc)
      }
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      cursor={'pointer'}
      onClick={handleGoogleAuth}
    >
      <Image src="/google.png" w={10} alt="Google logo" mt={20} />
      <Text mx="2" color={'blue.500'} fontSize="2xl" mt={20}>
        Sign in with Google
      </Text>
    </Flex>
  )
}

export default GoogleAuth
