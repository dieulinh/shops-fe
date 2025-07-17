import axios from "@/api/axiosInstance.js";

export const loginUser = async ({credentials}) => {
  const response =  await axios.post(`/auth`, credentials);

  return response.data
}