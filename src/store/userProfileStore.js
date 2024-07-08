import { create } from 'zustand'

const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile: userProfile }),
}))

export default useUserProfileStore
