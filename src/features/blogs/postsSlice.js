import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchPosts,fetchPost,createPost} from "@/features/blogs/postsAPI.js";

const initialState = {
  posts: [],
  post: null,
  status: 'idle',
  error: null
}
export const fetchPostsAsync = createAsyncThunk('posts/fetchPosts', async({page, query}) => {
  return await fetchPosts({page, query})
})
export const fetchPostAsync = createAsyncThunk('posts/fetchPost', async({page, query}) => {
  return await fetchPosts({page, query})
})

export const createPostAsync = createAsyncThunk('posts/createPost', async({post}) => {
  console.log('Post', post)
  return await createPost({post})
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostsAsync.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchPostsAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts = action.payload.posts
    })
    .addCase(fetchPostsAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    .addCase(fetchPostAsync.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(fetchPostAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.post = action.payload.post
    })
    .addCase(fetchPostAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    .addCase(createPostAsync.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(createPostAsync.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts.push(action.payload.post)
    })
    .addCase(createPostAsync.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})
export default postsSlice.reducer