import { request } from './index'

interface Desc {
  content: string
  title: string
}

export interface ProductsListItem {
  id: number
  imgsrc: string
  modelName: string
  modelPath: string
  price: number
  title: string
  desc: Array<Desc>
}

interface Products {
  isLoading: boolean
  list: Array<ProductsListItem>
  hdr: Array<string>
}

export const getProducts = () => {
  return request<Products>({
    method: 'GET',
    url: '/products',
  })
}
