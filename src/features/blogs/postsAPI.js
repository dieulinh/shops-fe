import axios from "@/api/axiosInstance.js";

export const fetchPosts = async ({page,query}) => {
  const response = await axios.get(`/posts?page=${page}&q=${query}`);

  return response.data
}
export const fetchPost = async ({page,query}) => {
  const response = await axios.get(`/posts?page=${page}&q=${query}`);

  return response.data
}
export const createPost = async ({post}) => {
  const response = await axios.post(`/posts`, {post});

  return response.data
}