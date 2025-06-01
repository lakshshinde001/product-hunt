// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null as string | null,
    email: '',
    fullname: '',
  }),
  actions: {
    setUser(payload: { token: string, email: string, fullname: string }) {
      this.token = payload.token
      this.email = payload.email
      this.fullname = payload.fullname
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
