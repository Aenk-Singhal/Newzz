import React, { useState } from 'react'
import useAuthStore from '../../store/authStore'
import useShowToast from './useShowToast'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'

const useLaughs = (article) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const authUser = useAuthStore((state) => state.user)
    const [laughs, setLaughs] = useState(article.laughs.length)
    const [isLaughed, setIsLaughed] = useState(article.laughs.includes(authUser?.uid))
    const showToast = useShowToast()
  
    const handleLaughs = async () => {
      if (isUpdating) return
      setIsUpdating(true)
      try {
        const articleRef = doc(firestore, 'articles', article.id)
        await updateDoc(articleRef, {
          laughs: isLaughed ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid),
        })
        setIsLaughed(!isLaughed)
        isLaughed ? setLaughs(laughs - 1) : setLaughs(laughs + 1)
      } catch (error) {
        showToast('Error', error.messaage, 'error')
      } finally {
        setIsUpdating(false)
      }
    }
  
    return { isLaughed, laughs, handleLaughs, isUpdating }
  }
  
  export default useLaughs