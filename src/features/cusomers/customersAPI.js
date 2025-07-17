import axios from "@/api/axiosInstance.js";

export const loginCustomer = async ({email, password}) => {
  const response = await axios.post('/customers/login', {
    email,
    password,
  });

  return response.data;
}
export const signUpCustomer = async ({email, password}) => {
  const response = await axios.post('/customers/signup', {
    email,
    password,
  });

  return response.data;
}