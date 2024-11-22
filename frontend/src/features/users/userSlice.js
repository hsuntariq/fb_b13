// import two things always
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, registerUser, verifyOTP } from "./userService";

// check user from the local storage
const checkUser = JSON.parse(localStorage.getItem("user"));

// create your state

const initialState = {
  user: checkUser ? checkUser : null,
  userLoading: false,
  userSuccess: false,
  userError: false,
  userMessage: "",
  allUsers: [],
};

// get the function from the service
export const registerUserData = createAsyncThunk(
  "reg-user",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const verifyOtpData = createAsyncThunk(
  "verify-otp",
  async (otpData, thunkAPI) => {
    try {
      return await verifyOTP(otpData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllUsersData = createAsyncThunk(
  "get-all-users",
  async (_, thunkAPI) => {
    try {
      return await getAllUsers();
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
      })
      .addCase(verifyOtpData.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(verifyOtpData.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(verifyOtpData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.user = action.payload;
      })
      .addCase(getAllUsersData.pending, (state, action) => {
        state.userLoading = true;
      })
      .addCase(getAllUsersData.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(getAllUsersData.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.allUsers = action.payload;
      });
  },
});

// export your slice/reducer into the store
export default userSlice.reducer;
export const { userReset } = userSlice.actions;
