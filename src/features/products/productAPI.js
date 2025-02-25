import axios from "@/api/axiosInstance.js";

export const fetchProduct = async (productId) => {

  const response = await axios.get(`/products/${productId}`);

  return response.data
}

export const uploadProductPhoto = async (formData) => {
  const response = await axios.post(`/photos/upload`,formData, { headers: { "Content-Type": "multipart/form-data"} });
  console.log(response.data)
  return response.data
}