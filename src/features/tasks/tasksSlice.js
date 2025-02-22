import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { fetchTasks, addTask } from "@/features/tasks/tasksAPI.js";

const initialState = {
  tasks: [],
  status: 'ide',
  error: null
}
export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async () => {
  return await fetchTasks();
})

export const addTaskAsync = createAsyncThunk('tasks/addTask', async(task) => {
  return await addTask(task);
})
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
  builder
    .addCase(fetchTasksAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchTasksAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      console.log(action.payload)
      state.tasks = action.payload.tasks;
    })
    .addCase(fetchTasksAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message;
    })
    .addCase(addTaskAsync.pending, (state,action) => {
      state.status = 'loading'
      console.log('action', action)
    })
    .addCase(addTaskAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.tasks.push(action.payload.task);
    })
    .addCase(addTaskAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message;
    })
}

})
export default tasksSlice.reducer;
