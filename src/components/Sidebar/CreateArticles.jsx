import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import useShowToast from '../hooks/useShowToast'
import useAuthStore from '../../store/authStore'
import useArticleStore from '../../store/articleStore'
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'

const CreateArticles = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const { isLoading, handleCreateArticle } = useCreateArticle()
  const showToast = useShowToast()

  const handleArticleCreation = async () => {
    try {
      await handleCreateArticle(title, body)
      onClose()
      setTitle('')
      setBody('')
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  return (
    <>
      <Flex
        alignItems={'center'}
        gap={4}
        _hover={{ bg: 'whiteAlpha.400' }}
        borderRadius={6}
        p={2}
        w={'full'}
        justifyContent={'flex-start'}
        onClick={onOpen}
      >
        <Box display={'block'}>Post Article</Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={'black'} border={'1px solid gray'}>
          <ModalHeader>Post Article</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Body..."
              mt={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={handleArticleCreation}
              isLoading={isLoading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateArticles

function useCreateArticle() {
  const showToast = useShowToast()
  const [isLoading, setIsLoading] = useState(false)
  const authUser = useAuthStore((state) => state.user)
  const createArticle = useArticleStore((state) => state.createArticle)

  const handleCreateArticle = async (title, body) => {
    if (isLoading) return
    if (!title || !body) throw new Error('Please fill all the fields.')
    setIsLoading(true)
    const newArticle = {
      title: title,
      body: body,
      likes: [],
      loves: [],
      laughs: [],
      dislikes: [],
      comments: [],
      archived: false,
      createdAt: Date.now(),
      createdBy: authUser.uid,
    }

    try {
      const articleDocRef = await addDoc(
        collection(firestore, 'articles'),
        newArticle
      )
      const userDocRef = doc(firestore, 'users', authUser.uid)

      await updateDoc(userDocRef, { articles: arrayUnion(articleDocRef.id) })

      createArticle({ ...newArticle, id: articleDocRef.id })

      showToast('Success', 'Article created successfully', 'success')
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, handleCreateArticle }
}
