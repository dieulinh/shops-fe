
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProduct } from './productAPI'
const initialState = {
  product: {},
  status: 'idle',
  error: null
}
export const fetchProductAsync = createAsyncThunk('product/fetchProduct', async (productId) => {
  return await fetchProduct(productId)

})

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.product = action.payload.product;
      })
      .addCase(fetchProductAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
  }
})

export default productSlice.reducer