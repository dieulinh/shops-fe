import axios from '@/api/axiosInstance.js'
export const fetchProducts = async () => {
  const response = await axios.get(`/products`);

  return response.data
}
export const addProduct = async ({product}) => {
  const response = axios.post('/products', product)

  return response.data
}
