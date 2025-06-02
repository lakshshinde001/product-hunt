// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
    email: '',
    fullname: '',
    userId: '', 
    profilePicture : '',
    phoneNumber : '',
  }),
  actions: {
    setUser(payload: { token: string, email: string, fullname: string, userId: string, profilePicture: string, phoneNumber: string }) {
      this.token = payload.token
      this.email = payload.email
      this.fullname = payload.fullname
      this.userId = payload.userId
      this.profilePicture = payload.profilePicture
      this.phoneNumber = payload.phoneNumber
    },
    clearUser() {
      this.token = null
      this.email = ''
      this.fullname = ''
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
})
