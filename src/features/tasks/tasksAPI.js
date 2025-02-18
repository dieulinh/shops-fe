import axios from '@/api/axiosInstance.js'
export const fetchTasks = async () => {
  const response = await axios.get(`/tasks`);
  return response.data

}
export const addTask = async ({task}) => {

  const response = await  axios.post('/tasks',  {task})

  return response.data
}
