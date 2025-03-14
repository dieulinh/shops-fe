import axios from "@/api/axiosInstance.js";

export const fetchOrder = async ({payment_intent, payment_intent_client_secret}) => {
  console.log(payment_intent,payment_intent_client_secret)
  const response = await axios.get(`/orders/confirm?payment_intent=${payment_intent}&payment_intent_client_secret=${payment_intent_client_secret}`);
  console.log(response.data)
  return response.data
}
export const updateOrder = async ({payment_intent, orderParams}) => {
  console.log(payment_intent,orderParams)
  const response = await axios.post(`/orders/update_order_address`, {payment_intent, order: orderParams});
  console.log(response.data)
  return response.data
}