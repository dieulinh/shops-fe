import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import { fetchProducts, addProduct } from "./productsAPI.js";

const initialState = {
  products: [],
  currentProduct: null,
  status: 'idle',
  error: null
}

export const fetchProductsAsync = createAsyncThunk('products/fetchProducts', async () => {

  return await fetchProducts();
})


export const addProductAsync = createAsyncThunk('products/addProduct', async(product) => {
  console.log('adding product', product)
  return await addProduct(product);
})
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

  },

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
      .addCase(addProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.products.unshift(action.payload.product)
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })

  }
})

export default productsSlice.reducer;
