import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goal/goalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goal: goalReducer, // 이렇게 goals라고 쓰든, goal이라고 쓰든 상관없음. 왜냐하면 goalReducer라는 이름으로 goalsSlice전체를 import했고, 그 값에대한 변수지명을 해준것과 마찬가지기 때문에, 해당 이름이 어떤것이던 간에 크게 상관없음.
  },
});
