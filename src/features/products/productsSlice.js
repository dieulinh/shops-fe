import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { fetchProducts, addProduct } from "./productsAPI.js";

const initialState = {
  products: [],
  status: 'ide',
  error: null
}

export const fetchProductsAsync = createAsyncThunk('products/fetchProducts', async () => {

  return await fetchProducts();
})

export const addTaskAsync = createAsyncThunk('products/addProduct', async({task}) => {
  console.log(task)
  return await addProduct(task);
})
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.products = action.payload.products;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
      .addCase(addTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'

        state.tasks = [...state.tasks,action.payload.task]
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
  }

})

export default productsSlice.reducer;
