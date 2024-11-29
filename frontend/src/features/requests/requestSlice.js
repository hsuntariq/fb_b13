import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addRequest, getMyRequests } from "./requestService";

const initialState = {
  requests: [],
  requestLoading: false,
  requestSuccess: false,
  requestError: false,
  requestMessage: "",
};

export const addFriendRequest = createAsyncThunk(
  "add-friend-request",
  async (to_id, thunkAPI) => {
    try {
      let token = thunkAPI.getState().user.user.token;
      return await addRequest(to_id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
export const myRequestsData = createAsyncThunk(
  "get-my-requests",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().user.user.token;
      return await getMyRequests(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// craete slice

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    requestReset: (state) => {
      state.requestError = false;
      state.requestLoading = false;
      state.requestMessage = "";
      state.requestSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFriendRequest.pending, (state, action) => {
        state.requestLoading = true;
      })
      .addCase(addFriendRequest.rejected, (state, action) => {
        state.requestError = true;
        state.requestLoading = false;
        state.requestMessage = action.payload;
      })
      .addCase(addFriendRequest.fulfilled, (state, action) => {
        state.requestLoading = false;
        state.requestSuccess = true;
      })
      .addCase(myRequestsData.pending, (state, action) => {
        state.requestLoading = true;
      })
      .addCase(myRequestsData.rejected, (state, action) => {
        state.requestError = true;
        state.requestLoading = false;
        state.requestMessage = action.payload;
      })
      .addCase(myRequestsData.fulfilled, (state, action) => {
        state.requestLoading = false;
        state.requestSuccess = true;
        state.requests = action.payload;
      });
  },
});

export const { requestReset } = requestSlice.actions;
export default requestSlice.reducer;
