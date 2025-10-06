import axios from "@/api/axiosInstance.js";

// Send Google auth credentials (or other provider credentials) to backend
// Expect backend endpoint POST /auth/google to accept body:
// { provider: 'google', access_token: '...', profile: { ...optional } }
// and respond with { token, user }
export const loginUser = async (credentials) => {
  const response = await axios.post(`/auth/google`, credentials);
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('loginUser response:', response.status, response.data);
  }
  return response.data;
};