import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {generateCheckoutToken} from "./checkoutAPI";

const initialState = {
  checkout: null,
  stripeToken: '',
  status: 'idle',
  error: null
}

export const generateCheckoutTokenAsync = createAsyncThunk('checkout/generateCheckoutToken', async (checkout_info) => {
  return await generateCheckoutToken(checkout_info)
})


const checkoutSlice = createSlice({
  initialState,
  name: 'checkout',
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(generateCheckoutTokenAsync.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(generateCheckoutTokenAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.stripeToken = action.payload.token
    })
    builder.addCase(generateCheckoutTokenAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })

  }
})
export default checkoutSlice.reducer
