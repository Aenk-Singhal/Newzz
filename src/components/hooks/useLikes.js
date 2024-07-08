import React, { useState } from 'react'
import useAuthStore from '../../store/authStore'
import useShowToast from './useShowToast'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'

const useLikes = (article) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const authUser = useAuthStore((state) => state.user)
  const [likes, setLikes] = useState(article.likes.length)
  const [isLiked, setIsLiked] = useState(article.likes.includes(authUser?.uid))
  const showToast = useShowToast()

  const handleLikes = async () => {
    if (isUpdating) return
    setIsUpdating(true)
    try {
      const articleRef = doc(firestore, 'articles', article.id)
      await updateDoc(articleRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
      })
      setIsLiked(!isLiked)
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
    } catch (error) {
      showToast('Error', error.messaage, 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  return { isLiked, likes, handleLikes, isUpdating }
}

export default useLikes
