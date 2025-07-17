
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


const initialState = {
  auth: null,
  status: 'idle',
  error: null
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {

      state.auth = action.payload
    },
    clearUser: (state) => {
      state.user = null
    }
  }
})

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;