import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchJobs, fetchJob, sendJobApplication} from "@/features/jobs/jobsAPI.js";


const initialState = {
  jobs: [],
  total_pages: 1,
  currentJob: null,
  job: null,
  status: 'idle',
  error: null
}
export const fetchJobsAsync = createAsyncThunk('jobs/fetchJobs', async({page, query}) => {
  return await fetchJobs({page, query})
})
export const fetchJobAsync = createAsyncThunk('jobs/fetchJob', async({job_id}) => {
  return await fetchJob({job_id})
})
export const sendJobApplicationAsync = createAsyncThunk('jobs/sendJobApplication', async(formData) => {
  return await sendJobApplication(formData)
})

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobsAsync.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchJobsAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.jobs = action.payload.jobs
      state.total_pages = action.payload.total_pages
    })
    .addCase(fetchJobsAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    .addCase(fetchJobAsync.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchJobAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.currentJob = action.payload.job
    })
    .addCase(fetchJobAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
      .addCase(sendJobApplicationAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(sendJobApplicationAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.job = action.payload
        // Optionally handle the success case
      })
      .addCase(sendJobApplicationAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})
export default jobsSlice.reducer