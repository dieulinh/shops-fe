import axios from "@/api/axiosInstance.js";

export const fetchJobs = async ({page,query}) => {
  const response = await axios.get(`/job_listing?page=${page}&q=${query}`);

  return response.data
}
export const fetchJob = async ({job_id}) => {
  const response =  await axios.get(`/job_listing/${job_id}`);

  return response.data
}