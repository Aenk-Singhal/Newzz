import React, { useState } from 'react'
import useAuthStore from '../../store/authStore'
import useShowToast from './useShowToast'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'

const useDislikes = (article) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const authUser = useAuthStore((state) => state.user)
  const [dislikes, setDislikes] = useState(article.dislikes.length)
  const [isDisliked, setIsDisliked] = useState(
    article.dislikes.includes(authUser?.uid)
  )
  const showToast = useShowToast()

  const handleDislikes = async () => {
    if (isUpdating) return
    setIsUpdating(true)
    try {
      const articleRef = doc(firestore, 'articles', article.id)
      await updateDoc(articleRef, {
        dislikes: isDisliked
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      })
      setIsDisliked(!isDisliked)
      isDisliked ? setDislikes(dislikes - 1) : setDislikes(dislikes + 1)
    } catch (error) {
      showToast('Error', error.messaage, 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  return { isDisliked, dislikes, handleDislikes, isUpdating }
}

export default useDislikes
