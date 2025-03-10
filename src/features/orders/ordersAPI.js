import axios from "@/api/axiosInstance.js";

export const fetchOrder = async ({payment_intent, payment_intent_client_secret}) => {
  console.log(payment_intent,payment_intent_client_secret)
  const response = await axios.get(`/orders/confirm?payment_intent=${payment_intent}&payment_intent_client_secret=${payment_intent_client_secret}`);
  console.log(response.data)
  return response.data
}
