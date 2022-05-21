import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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
