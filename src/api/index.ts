import axios, { AxiosRequestConfig } from 'axios'

interface ResponseType<T = any> {
  status: number
  statusText: string
  data: T
}

const instance = axios.create({
  baseURL: 'http://api.cpengx.cn/metashop/api',
})

instance.interceptors.response.use(
  (response: ResponseType) => {
    if (response.status !== 200) {
      // TODO show message
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export async function request<T>(config: AxiosRequestConfig) {
  return instance.request<ResponseType<T>, T>(config).then((res) => res)
}
