import { defineStore } from 'pinia'

export const counter = defineStore('counter', {
  state: () => {
    return {
      count: 0,
    }
  },
})
