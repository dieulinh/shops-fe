import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import axios from '@/api/axiosInstance.js'
import {fetchTasks} from "@/features/tasks/tasksAPI.js";

const initialState = {
  tasks: [],
  isLoadingTasks: false,
  error: null
}

export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async () => {

  // const response = await axios.get('/tasks');
  return await fetchTasks();
})
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'ide',
    error: null
  },
  reducers: {},


  extraReducers: (builder) => {
  builder
    .addCase(fetchTasksAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchTasksAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'

      state.tasks = action.payload.tasks;
    })
    .addCase(fetchTasksAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message;
    })
}


})



export default tasksSlice.reducer;
