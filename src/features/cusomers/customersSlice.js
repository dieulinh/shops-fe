import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {loginCustomer,signUpCustomer} from "@/features/cusomers/customersAPI.js";

const initialState = {
  customers: [],
  customer: null,
  newCustomerUser: null,
  status: 'idle',
  error: null,
}
export const loginCustomerAsync = createAsyncThunk('customers/loginCustomer', async ({email, password}) => {
  return await loginCustomer({email, password});

})
export const signUpCustomerAsync = createAsyncThunk('customers/signUpCustomer', async ({email, password}) => {
  return await signUpCustomer({email, password});

})
const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginCustomerAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loginCustomerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.customer = action.payload.customer
      })
      .addCase(loginCustomerAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(signUpCustomerAsync.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(signUpCustomerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.newCustomerUser = action.payload.customer_user
      })
      .addCase(signUpCustomerAsync.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})
export default customerSlice.reducer