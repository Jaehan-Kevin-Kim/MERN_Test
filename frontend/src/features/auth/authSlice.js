import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Get user from localStorage (token을 localStorage에 저장해서 그걸 가져올것임)
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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
  extraReducers: () => {}, // 여기 기재되는 값은 전부 asynchronous 동작일 예정
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
