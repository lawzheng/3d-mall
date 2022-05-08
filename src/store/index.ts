import { defineStore } from 'pinia'

export const useStore = defineStore('base', {
  state: () => {
    return {
      count: 0,
      isFullscreen: false,
    }
  },
  actions: {
    setFullscreen(state: boolean) {
      this.isFullscreen = state
    },
  },
})
