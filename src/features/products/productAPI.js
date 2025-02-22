import axios from "@/api/axiosInstance.js";

export const fetchProduct = async (productId) => {

  const response = await axios.get(`/products/${productId}`);

  return response.data
}