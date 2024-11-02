// import two things always
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "./userService";

// check user from the local storage
const checkUser = JSON.parse(localStorage.getItem("user"));

// create your state

const initialState = {
  user: checkUser ? checkUser : null,
  userLoading: false,
  userSuccess: false,
  userError: false,
  userMessage: "",
};

// get the function from the service
export const registerUserData = createAsyncThunk(
  "register-user",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

// create your slice

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state) => {
      state.userLoading = false;
      state.userError = false;
      state.userSuccess = false;
      state.userMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserData.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(registerUserData.rejected, (state, action) => {
        state.userError = true;
        state.userLoading = false;
        state.userMessage = action.payload;
        state.user = null;
      })
      .addCase(registerUserData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.user = action.payload;
      });
  },
});

// export your slice/reducer into the store
export default userSlice.reducer;
export const { userReset } = userSlice.actions;
