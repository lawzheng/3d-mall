import { defineStore } from 'pinia'

export default defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  }
})
