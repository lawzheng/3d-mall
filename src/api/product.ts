import { request } from './index'

interface Desc {
  content: string
  title: string
}

interface ProductsListItem {
  id: number
  imgsrc: string
  modelName: string
  modelPath: string
  price: number
  title: string
  desc: Array<Desc>
}

interface Products {
  list: Array<ProductsListItem>
  hdr: Array<number>
}

export const getProducts = () => {
  return request<Products>({
    method: 'GET',
    url: '/products',
  })
}
