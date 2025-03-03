import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProduct, uploadProductPhoto } from './productAPI'
const initialState = {
  product: {},
  image_url: null,
  status: 'idle',
  error: null
}
export const fetchProductAsync = createAsyncThunk('product/fetchProduct', async (productId) => {
  return await fetchProduct(productId)
})
export const uploadPhotoAsync = createAsyncThunk('product/uploadPhoto', async (formData) => {
  return await uploadProductPhoto(formData)
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
      .addCase(uploadPhotoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadPhotoAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.image_url = action.payload.image_url;
      })
      .addCase(uploadPhotoAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
  }
})

export default productSlice.reducer