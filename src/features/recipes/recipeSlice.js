import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecipe } from './recipeAPI.js';

const initialState = {
  recipe: {},
  status: 'idle',
  error: null,
};

export const fetchRecipeAsync = createAsyncThunk('recipe/fetchRecipe', async (id) => {
  return await fetchRecipe(id);
});

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipeAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Support {recipe: {...}} or plain object
        state.recipe = action.payload.recipe || action.payload || {};
      })
      .addCase(fetchRecipeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default recipeSlice.reducer;
