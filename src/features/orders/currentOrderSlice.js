import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrder } from './ordersAPI.js'
const initialState = {
  currentOrder: null,
  status: 'idle',
  error: null
}

export const confirmOrderAsync = createAsyncThunk('currentOrder/confirmOrder', async ({payment_intent, payment_intent_client_secret}) => {
  return await fetchOrder({payment_intent, payment_intent_client_secret})
})

const currentOrderSlice = createSlice({
  initialState,
  name: 'currentOrder',
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmOrderAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentOrder = action.payload.order;
      })
      .addCase(confirmOrderAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message;
      })
  }
})
export default currentOrderSlice.reducer;