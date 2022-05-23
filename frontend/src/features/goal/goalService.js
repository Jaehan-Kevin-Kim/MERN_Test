import axios from "axios";

const API_URL = "api/goals/";

// Create new goal
const createGoal = async (goalData, token) => {
  const config = {
    // token의 경우 header에서 Authorization이라는 key로 "Bearer token의 형태로 전달 되므로 그렇게 전달하도록 설정 하기"
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

// Get user goals
const getGoals = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.get(API_URL, config);
  console.log(`response: ${response}`);
  return response.data;
};

const goalService = { createGoal, getGoals };

export default goalService;
