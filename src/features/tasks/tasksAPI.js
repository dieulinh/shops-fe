import axios from '@/api/axiosInstance.js'
export const fetchTasks = async () => {
  const response = await axios.get(`/tasks`);
  return response.data

}
export const createTask = ({task}) => {
  const response = axios.post('/tasks', task)
  console.log(response)
  return response.data
}
// export default {fetchTasks}