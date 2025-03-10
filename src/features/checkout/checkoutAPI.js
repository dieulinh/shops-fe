import axios from "@/api/axiosInstance.js";

export const generateCheckoutToken = async (checkout_info) => {

  const response = await axios.post(`/stripe/generate_checkout_token`, checkout_info);
  console.log('checkout info response', response.data)

  return response.data
}
