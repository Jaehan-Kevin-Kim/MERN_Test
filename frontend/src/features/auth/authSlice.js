import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from localStorage (token을 localStorage에 저장해서 그걸 가져올것임)
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  // user: user ? user : null,
  user: user ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register", // string with the action
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message); //이렇게 해 주면, error 발생 시 해당 요청을 reject 해 주고, message를 payload에 넣어 줌.
    }
  },
);

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (loginInfo, thunkAPI) => {
    try {
      return await authService.login(loginInfo);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Logout user
export const logout = createAsyncThunk(
  "auth/logout", // auth Reducer안에 logout 동작 임.
  async () => {
    await authService.logout();
  },
);

export const authSlice = createSlice({
  name: "auth", // slice이름
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
    // 여기 기재되는 값은 전부 asynchronous 동작일 예정
    // 비동기 / thunk function들이 여기 기재 됨.
    builder
      .addCase(register.pending, (state) => {
        // 로딩 시
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        // 성공 시
        // 성공 시에는 돌려 받는 data가 있기 때문에 action을 추가 해 주기
        state.isLoading = false;
        state.isSuccexss = true;
        state.user = action.payload; // 해당 action.payload는 위 register method에서 성공 시 return await authService.register(user) 을 통해 user를 return 해줬음. 따라서 action.payload의 값은 user임.
      })
      .addCase(register.rejected, (state, action) => {
        // 오류 발생 시
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // 이거는 역시 위 register method에서 오류 발생 시 catch 구문에서 thunkAPI.rejectWithValue(message)로 message를 리턴 해 주었기 때문에 action.payload의 값이 해당 message의 값이 됨.
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

// 위와 같이 authSlice의 reducers에 있는 값들을 아래와 같이 기재 해 줘야 함.
export const { reset } = authSlice.actions;

// 아래는 최종적으로 다른 곳에서 사용할 수 있도록 export 하는 방법
export default authSlice.reducer;
