import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';
import productsReducer from '@/features/products/productsSlice.js'
import productReducer from '@/features/products/productSlice.js'
import cartReducer from '@/features/cart/cartSlice.js'
import checkoutReducer from '@/features/checkout/checkoutSlice.js'
import currentOrderReducer from '@/features/orders/currentOrderSlice.js'
import jobsReducer from '@/features/jobs/jobsSlice.js'
import authReducer from "@/features/auth/authSlice.js";
import calendarReducer from "@/features/calendars/calendarSlice.js";
import postsReducer from "@/features/blogs/postsSlice.js";
import jobApplicationReducer from "@/features/jobs/jobApplicationsSlice.js";
import customersSlice from "@/features/cusomers/customersSlice.js";

const store = configureStore({
  reducer: {
    jobApplications: jobApplicationReducer,
    tasks: tasksReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    currentOrder: currentOrderReducer,
    jobs: jobsReducer,
    auth: authReducer,
    calendar: calendarReducer,
    posts: postsReducer,
    customers: customersSlice

  },
});
export default store;