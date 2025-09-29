import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchRecipes } from './recipesAPI.js';

const initialState = {
  recipes: [],
  status: 'idle',
  error: null,
  total_pages: 1,
};

export const fetchRecipesAsync = createAsyncThunk('recipes/fetchRecipes', async ({ page, query } = {}) => {
  return await fetchRecipes({ page, query });
});

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Support both {recipes: [...], total_pages} and plain array
        if (Array.isArray(action.payload)) {
          state.recipes = action.payload;
        } else {
          state.recipes = action.payload.recipes || [];
          if (action.payload.total_pages) state.total_pages = action.payload.total_pages;
        }
      })
      .addCase(fetchRecipesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recipesSlice.reducer;
