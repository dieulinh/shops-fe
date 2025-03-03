import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';
import productsReducer from '@/features/products/productsSlice.js'
import productReducer from '@/features/products/productSlice.js'
import cartReducer from '@/features/cart/cartSlice.js'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer
  },
});
export default store;