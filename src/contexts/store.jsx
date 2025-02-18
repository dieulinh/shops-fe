import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';
// import usersReducer from '../features/users/usersSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
export default store;