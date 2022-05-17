import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage (token을 localStorage에 저장해서 그걸 가져올것임)
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 여기 기재되는 값은 전부 synchronous 동작일 예정
    reset: (state) => {
      // 아래는 default state values 임. (해당 reset reducer를 dispatch 하면 아래 값과 같이 모든 값들이 reset 됨.)
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        // 로딩 시
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // 성공 시
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // 해당 action.payload는 위 register method에서 성공 시 return await authService.register(user) 을 통해 user를 return 해줬음. 따라서 action.payload의 값은 user임.
      })
      .addCase(register.rejected, (state, action) => {
        // 오류 발생 시
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // 이거는 역시 위 register method에서 오류 발생 시 catch 구문에서 thunkAPI.rejectWithValue(message)로 message를 리턴 해 주었기 때문에 action.payload의 값이 해당 message의 값이 됨.
        state.user = null;
      });
  }, // 여기 기재되는 값은 전부 asynchronous 동작일 예정
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
