import { defineStore } from 'pinia'
import { ProductsListItem } from '../api/product'

interface BuyCarts extends ProductsListItem {
  num: number
}

interface Store {
  isFullscreen: boolean
  buyCarts: Array<BuyCarts>
}

export const useStore = defineStore('base', {
  state: (): Store => {
    return {
      isFullscreen: false,
      buyCarts: [],
    }
  },
  getters: {
    totalPrice(): number {
      return this.buyCarts.reduce((pre, item) => {
        return pre + item.price * item.num
      }, 0)
    },
  },
  actions: {
    setFullscreen(state: boolean) {
      this.isFullscreen = state
    },
    addBuyCarts(payload: BuyCarts) {
      this.buyCarts.push(payload)
    },
    addBuyCartsNum(index: number) {
      this.buyCarts[index].num++
    },
    minusBuycartsNum(index: number) {
      this.buyCarts[index].num--
      if (this.buyCarts[index].num == 0) {
        this.buyCarts.splice(index, 1)
      }
    },
  },
})
