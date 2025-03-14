import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { fetchTasks, addTask, updateTask } from "@/features/tasks/tasksAPI.js";

const initialState = {
  tasks: [],
  status: 'idle',
  newAdded: null,
  error: null
}
export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async () => {
  return await fetchTasks();
})

export const addTaskAsync = createAsyncThunk('tasks/addTask', async(task) => {
  return await addTask(task);
})

export const saveTaskWithUrl = createAsyncThunk('tasks/saveTask', async(taskParams) => {
  console.log(taskParams)
  return await updateTask(taskParams);
} )
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {

    setCurrentTask(state, action) {
      console.log(action.payload)
      state.currentTask = action.payload;
    }
  },

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

    })
    .addCase(addTaskAsync.fulfilled, (state, action) => {
      console.log(action.payload)
      state.status = 'succeeded'
      state.newAdded = action.payload.task
      state.tasks.push(action.payload.task);
    })
    .addCase(addTaskAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message;
    })
    .addCase(saveTaskWithUrl.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(saveTaskWithUrl.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.newAdded = action.payload.task
    })
    .addCase(saveTaskWithUrl.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message;
    })
}

})
export const {setCurrentTask} = tasksSlice.actions;
export default tasksSlice.reducer;
