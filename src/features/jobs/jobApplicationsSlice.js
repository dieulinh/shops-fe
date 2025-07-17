import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


import {sendRequestAvailability} from "@/features/jobs/jobApplicationsAPI.js";

const initialState = {
  jobApplications: [],
  requestAvailability: null,
  status: 'idle',
  error: null

}

export const sendRequestAvailabilityAsync = createAsyncThunk('jobApplications/sendRequestAvailability', async({job_application_id}) => {
  return await sendRequestAvailability({job_application_id})
})

const jobApplicationsSlice = createSlice({
  name: 'jobApplications',
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
    builder.addCase(sendRequestAvailabilityAsync.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(sendRequestAvailabilityAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.requestAvailability = action.payload.request_availability
    })
    .addCase(sendRequestAvailabilityAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export default jobApplicationsSlice.reducer