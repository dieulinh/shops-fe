import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "@/features/auth/userAPI.js";

// We standardize auth state: user object + token.
// Assumption: backend /auth returns { token: string, user: {...} }
// Google login currently returns { access_token, userData }. We'll normalize that in setUser reducer.

const initialState = {
  auth: null,        // user object
  token: null,       // jwt or oauth access token
  status: 'idle',    // idle | loading | succeeded | failed
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser({ credentials });
      return data; // expecting { token, user }
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Accept flexible payload shapes: { token, user } OR { access_token, userData }
      const payload = action.payload || {};
      const token = payload.token || payload.access_token || payload.credential || null;
      const user = payload.user || payload.userData || null;
      state.auth = user;
      state.token = token;
      state.error = null;
      if (token) localStorage.setItem('authToken', token);
      if (user) localStorage.setItem('userData', JSON.stringify(user));
    },
    clearUser: (state) => {
      state.auth = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    },
    hydrateFromStorage: (state) => {
      // Attempt to restore persisted auth
      try {
        const token = localStorage.getItem('authToken');
        const userRaw = localStorage.getItem('userData');
        if (token) state.token = token;
        if (userRaw) state.auth = JSON.parse(userRaw);
      } catch {
        // ignore
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { token, user } = action.payload || {};
        state.auth = user || null;
        state.token = token || null;
        if (token) localStorage.setItem('authToken', token);
        if (user) localStorage.setItem('userData', JSON.stringify(user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });
  }
});

export const { setUser, clearUser, hydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;