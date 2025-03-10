import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: {},
  status: 'idle',
  error: null
}

const generateOrderToken = async (order) => {
  const response = await fetch('https://api.stripe.com/v1/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: {payload: order}
  })
  return response.json()
}

const ordersSlice = createSlice({
  initialState,
  name: 'orders',
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(generateOrderToken.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(generateOrderToken.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.orders.push(action.payload)
    })
    builder.addCase(generateOrderToken.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})
export default ordersSlice.reducer

