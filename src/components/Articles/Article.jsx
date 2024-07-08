import { Box, useDisclosure } from '@chakra-ui/react'
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { FaFaceLaughSquint, FaRegFaceLaughSquint } from 'react-icons/fa6'
import { MdArchive, MdDelete } from 'react-icons/md'
import useShowToast from '../hooks/useShowToast'
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'
import useArticleStore from '../../store/articleStore'
import useAuthStore from '../../store/authStore'
import useLikes from '../hooks/useLikes'
import useLoves from '../hooks/useLoves'
import useLaughs from '../hooks/useLaughs'
import useDislikes from '../hooks/useDislikes'
import { v4 as uuidv4 } from 'uuid'

const Article = ({ article }) => {
  const authUser = useAuthStore((state) => state.user)
  const showToast = useShowToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const deleteArticle = useArticleStore((state) => state.deleteArticle)
  const { isLiked, likes, handleLikes } = useLikes(article)
  const { isLoved, loves, handleLoves } = useLoves(article)
  const { isLaughed, laughs, handleLaughs } = useLaughs(article)
  const { isDisliked, dislikes, handleDislikes } = useDislikes(article)
  const [isArchiving, setIsArchiving] = useState(false)
  const [archived, setArchived] = useState(article.archived)
  const [comment, setComment] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAddComment = async () => {
    if (comment.trim() === '') return
    const newComment = {
      id: uuidv4(),
      text: comment.trim(),
      createdBy: authUser.uid,
      createdAt: new Date().toISOString(),
      userName: authUser.fullName,
    }
    try {
      const articleRef = doc(firestore, 'articles', article.id)
      await updateDoc(articleRef, {
        comments: arrayUnion(newComment),
      })
      article.comments.push(newComment)
      setComment('')
      showToast('Success', 'Comment added successfully', 'success')
      onClose()
    } catch (error) {
      showToast('Error', error.message, 'error')
      console.log(error)
    }
  }

  const handleDeleteArticle = async () => {
    if (!window.confirm('Are you sure you want to delete this post')) return
    if (isDeleting) return
    try {
      const userRef = doc(firestore, 'users', authUser.uid)
      await deleteDoc(doc(firestore, 'articles', article.id))
      await updateDoc(userRef, { articles: arrayRemove(article.id) })
      deleteArticle(article.id)
      showToast('Success', 'Article deleted successfully', 'success')
    } catch (error) {
      showToast('Error', error.message, 'error')
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleArchiveArticle = async () => {
    if (isArchiving) return
    try {
      const articleRef = doc(firestore, 'articles', article.id)
      await updateDoc(articleRef, { archived: !archived })
      setArchived(!archived)
      archived
        ? showToast('Success', 'Article Unrchived successfully', 'success')
        : showToast('Success', 'Article Archived successfully', 'success')
    } catch (error) {
      showToast('Error', error.message, 'error')
      console.log(error)
    } finally {
      setIsArchiving(false)
    }
  }

  return (
    <div>
      {/* HEADER */}
      <Box
        maxW={'sm'}
        borderWidth={'5px'}
        borderRadius={'lg'}
        overflow={'auto'}
        p={'10px'}
      >
        {article.title}
      </Box>

      {/* BODY */}

      <Box
        maxW={'sm'}
        height={'xs'}
        borderWidth={'1px'}
        borderRadius={'lg'}
        overflow={'auto'}
        p={'10px'}
      >
        {article.body}
      </Box>

      {/* FOOTER */}

      <Flex mx={'10px'}>
        <Flex alignItems={'center'} gap={4} w={'full'} mt={2}>
          <Box onClick={handleLikes} cursor={'pointer'}>
            <Flex gap={'3px'}>
              {!isLiked ? (
                <AiOutlineLike size={'20px'} />
              ) : (
                <AiFillLike size={'20px'} color="cyan" />
              )}
              <Box pt={1}>{likes}</Box>
            </Flex>
          </Box>
          <Box onClick={handleLoves} cursor={'pointer'}>
            <Flex gap={'3px'}>
              {!isLoved ? (
                <FaRegHeart size={'20px'} />
              ) : (
                <FaHeart size={'20px'} color="red" />
              )}
              <Box pt={1}>{loves}</Box>
            </Flex>
          </Box>
          <Box onClick={handleLaughs} cursor={'pointer'}>
            <Flex gap={'3px'}>
              {!isLaughed ? (
                <FaRegFaceLaughSquint size={'20px'} />
              ) : (
                <FaFaceLaughSquint size={'20px'} color="yellow" />
              )}
              <Box pt={1}>{laughs}</Box>
            </Flex>
          </Box>
          <Box onClick={handleDislikes} cursor={'pointer'}>
            <Flex gap={'3px'}>
              {!isDisliked ? (
                <AiOutlineDislike size={'20px'} />
              ) : (
                <AiFillDislike size={'20px'} color="cyan" />
              )}
              <Box pt={1}>{dislikes}</Box>
            </Flex>
          </Box>
        </Flex>
        <Flex gap={2}>
          <Box
            cursor={'pointer'}
            mt={2}
            onClick={handleDeleteArticle}
            isLoading={isDeleting}
          >
            {authUser.uid === article.createdBy ? (
              <MdDelete size={'20px'} color="red" />
            ) : null}
          </Box>
          <Box
            cursor={'pointer'}
            mt={2}
            onClick={handleArchiveArticle}
            isLoading={isArchiving}
          >
            {authUser.uid === article.createdBy ? (
              <MdArchive size={'20px'} color="green" />
            ) : null}
          </Box>
        </Flex>
      </Flex>
      {article.comments.length > 0 ? (
        <Text
          fontSize={'sm'}
          color={'gray'}
          mx={'10px'}
          mt={2}
          cursor="pointer"
          onClick={onOpen}
        >
          View all {article.comments.length} comments
        </Text>
      ) : null}
      <Flex
        alignItems={'center'}
        gap={2}
        justifyContent={'space-between'}
        w={'full'}
        mx={'10px'}
      >
        <InputGroup>
          <Input
            variant={'flushed'}
            placeholder={'Add a Comment...'}
            fontSize={14}
            mr={'15px'}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={'blue.500'}
              fontWeight={600}
              cursor={'pointer'}
              _hover={{ color: 'white' }}
              bg={'transparent'}
              mr={'30px'}
              onClick={handleAddComment}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {article.comments.map((comment) => (
              <Box key={comment.id} mb={4}>
                <Text fontSize="sm" fontWeight="bold">
                  {comment.createdBy === authUser.uid
                    ? 'You'
                    : comment.userName}
                  :
                </Text>
                <Text fontSize="sm">{comment.text}</Text>
              </Box>
            ))}
          </ModalBody>
          <ModalFooter>
            <InputGroup>
              <Input
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleAddComment}>
                  Post
                </Button>
              </InputRightElement>
            </InputGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Article
