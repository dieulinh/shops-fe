import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';
// import usersReducer from '../features/users/usersSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Key: 'tasks' handles task-related state

  },
});
export default store;