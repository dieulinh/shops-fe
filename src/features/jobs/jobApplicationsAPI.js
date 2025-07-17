import axios from "@/api/axiosInstance.js";

export const sendRequestAvailability = async ({job_application_id}) => {


  const response =  await axios.post(`/job_applications/${job_application_id}/request_availability`, {});

  return response.data
}