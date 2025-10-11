import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRecipe } from './recipeAPI.js';
import { fetchRecipeComments, postRecipeComment } from './commentsAPI.js';

const initialState = {
  recipe: {},
  status: 'idle',
  error: null,
  comments: [],
  commentsStatus: 'idle', // idle | loading | succeeded | failed
  commentsError: null,
  addCommentStatus: 'idle',
  addCommentError: null,
};

export const fetchRecipeAsync = createAsyncThunk('recipe/fetchRecipe', async (id) => {
  return await fetchRecipe(id);
});

export const fetchRecipeCommentsAsync = createAsyncThunk('recipe/fetchComments', async (recipeId) => {
  const data = await fetchRecipeComments(recipeId);
  return Array.isArray(data) ? data : (data.comments || []);
});

export const addRecipeCommentAsync = createAsyncThunk(
  'recipe/addComment',
  async ({ recipeId, body }, { rejectWithValue }) => {
    try {
      const data = await postRecipeComment({ recipeId, body });
      return data.comment || data; // support {comment: {...}} or raw object
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message || 'Failed to add comment');
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    resetAddCommentStatus: (state) => {
      state.addCommentStatus = 'idle';
      state.addCommentError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch recipe
      .addCase(fetchRecipeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipeAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.recipe = action.payload.recipe || action.payload || {};
      })
      .addCase(fetchRecipeAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Fetch comments
      .addCase(fetchRecipeCommentsAsync.pending, (state) => {
        state.commentsStatus = 'loading';
      })
      .addCase(fetchRecipeCommentsAsync.fulfilled, (state, action) => {
        state.commentsStatus = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchRecipeCommentsAsync.rejected, (state, action) => {
        state.commentsStatus = 'failed';
        state.commentsError = action.error.message;
      })
      // Add comment
      .addCase(addRecipeCommentAsync.pending, (state) => {
        state.addCommentStatus = 'loading';
        state.addCommentError = null;
      })
      .addCase(addRecipeCommentAsync.fulfilled, (state, action) => {
        state.addCommentStatus = 'succeeded';
        if (action.payload) {
          state.comments.unshift(action.payload); // newest first
        }
      })
      .addCase(addRecipeCommentAsync.rejected, (state, action) => {
        state.addCommentStatus = 'failed';
        state.addCommentError = action.payload || action.error.message;
      });
  },
});

export const { resetAddCommentStatus } = recipeSlice.actions;
export default recipeSlice.reducer;
