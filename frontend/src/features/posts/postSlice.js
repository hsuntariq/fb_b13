import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addComment, getPosts, uploadPost } from "./postService";
import MyPosts from "../../components/home/MyPosts";

const initialState = {
  posts: [],
  postLoading: false,
  postSuccess: false,
  postError: false,
  postMessage: "",
  getPostSuccess: false,
  commentLoading: false,
};

export const uploadPostData = createAsyncThunk(
  "upload-post",
  async (postData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().user.user.token;
      return await uploadPost(postData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
export const addCommentData = createAsyncThunk(
  "add-comment",
  async (postData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().user.user.token;
      return await addComment(postData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
export const getPostData = createAsyncThunk(
  "get-posts",
  async (_, thunkAPI) => {
    try {
      return await getPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// create slice
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postReset: (state) => {
      state.postError = false;
      state.postLoading = false;
      state.postSuccess = false;
      state.postMessage = "";
      state.getPostSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPostData.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(uploadPostData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.postMessage = action.payload;
      })
      .addCase(uploadPostData.fulfilled, (state, action) => {
        state.postLoading = false;
        state.postSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(getPostData.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(getPostData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.postMessage = action.payload;
      })
      .addCase(getPostData.fulfilled, (state, action) => {
        state.postLoading = false;
        state.getPostSuccess = true;
        state.posts = action.payload;
      })
      .addCase(addCommentData.pending, (state, action) => {
        state.commentLoading = true;
      })
      .addCase(addCommentData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.postMessage = action.payload;
      })
      .addCase(addCommentData.fulfilled, (state, action) => {
        state.postLoading = false;
        state.getPostSuccess = true;
        state.posts.map((item, index) => {
          if (item?._id == action?.payload?._id) {
            item.comments = action.payload.comments;
          }
        });
      });
  },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;
