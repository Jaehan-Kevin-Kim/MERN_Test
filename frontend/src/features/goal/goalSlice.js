import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create New Goal
export const createGoal = createAsyncThunk(
  "goals/create", // 이게 action 이름임.
  async (goalData, thunkAPI) => {
    try {
      //authSlice에서 register와 login은 token을 보낼 필요가 없었음 (요청 시 생성되는 형태였음. 하지만 여기서는 token을 보내 줘야 함.)
      const token = thunkAPI.getState().auth.user.token; //thunkAPI object의 getState()를 통해 해당 program에 존재하는 어떤 state에든 접속이 가능 함. 따라서 auth state로 접근 해서 해당 state의 user.token값을 읽어오기
      return await goalService.createGoal(goalData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const goalsSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState, // 아래와 같이 다 기재해서 작성하거나, 아니면 reset하려고 하는 형태가 위 initialState와 똑 같으니까, 이렇게 한번에 initialState라고 기재 해도 됨.
    // {
    //   state.goals = [];
    //   state.isError = false;
    //   state.isSuccess = false;
    //   state.isLoading = false;
    //   state.message = "";
    // },
  },
  extraReducers: () => {},
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
