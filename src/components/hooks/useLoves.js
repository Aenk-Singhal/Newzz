import React, { useState } from 'react'
import useAuthStore from '../../store/authStore'
import useShowToast from './useShowToast'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'

const useLoves = (article) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const [loves, setLoves] = useState(article.loves.length)
    const [isLoved, setIsLoved] = useState(article.loves.includes(authUser?.uid))
    const showToast = useShowToast()
  
    const handleLoves = async () => {
      if (isUpdating) return
      setIsUpdating(true)
      try {
        const articleRef = doc(firestore, 'articles', article.id)
        await updateDoc(articleRef, {
          loves: isLoved ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
        })
        setIsLoved(!isLoved)
        isLoved ? setLoves(loves - 1) : setLoves(loves + 1)
      } catch (error) {
        showToast('Error', error.messaage, 'error')
      } finally {
        setIsUpdating(false)
      }
    }
  
    return { isLoved, loves, handleLoves, isUpdating }
  }
  
  export default useLoves