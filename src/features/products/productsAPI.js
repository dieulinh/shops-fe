import axios from '@/api/axiosInstance.js'
export const fetchProducts = async ({page,query}) => {
  const response = await axios.get(`/products?page=${page}&q=${encodeURIComponent(query ?? "")}`);

  return response.data
}

export const addProduct = async ({product}) => {

  const response = await axios.post('/products', {product})

  return response.data
}
