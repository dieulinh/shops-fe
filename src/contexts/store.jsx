import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';
import productsReducer from '@/features/products/productsSlice.js'
import productReducer from '@/features/products/productSlice.js'
// import usersReducer from '../features/users/usersSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    products: productsReducer,
    product: productReducer,
  },
});
export default store;