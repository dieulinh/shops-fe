import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchJobs,fetchJob} from "@/features/jobs/jobsAPI.js";


const initialState = {
  jobs: [],
  currentJob: null,
  status: 'idle',
  error: null
}
export const fetchJobsAsync = createAsyncThunk('jobs/fetchJobs', async({page, query}) => {
  return await fetchJobs({page, query})
})
export const fetchJobAsync = createAsyncThunk('jobs/fetchJob', async({job_id}) => {
  return await fetchJob({job_id})
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
  }
})
export default jobsSlice.reducer