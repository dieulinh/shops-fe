import axios from "@/api/axiosInstance.js";

export const createEvent = async (event_params) => {
  const response =  await axios.post(`/events`, event_params);

  return response.data
}
export const fetchEvents = async (events_params) => {
  const response =  await axios.get(`/events`, events_params);

  return response.data
}