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

//Get user goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    /// 여기선 thunkAPI를 사용해야 하는데, thunkAPI는 무조건 두번째 인자이기 때문에, (_, thunkAPI) 이런식으로 parameter로 설정해줘야 thunkAPI가 정상적으로 동작함 (그렇게 하지 않으며, 우너하는 값을 못 가져옴.)
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
    } catch (error) {
      console.log(error);
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
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        console.log(`action.payload: ${action.payload}`);
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.rejected = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
