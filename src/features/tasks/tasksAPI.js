import axios from '@/api/axiosInstance.js'
export const fetchTasks = async () => {
  const response = await axios.get(`/tasks`);
  return response.data
}
export const addTask = async ({task}) => {

  const response = await axios.post('/tasks',  {task})
  console.log(response.data)
  return response.data
}

export const updateTask = async(taskParams) => {
  const response = await axios.post(`/tasks/${taskParams.id}/update`, taskParams);
  return response.data
}
