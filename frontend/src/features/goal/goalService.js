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
  console.log(`goalData: ${goalData}`);

  const response = await axios.post(API_URL, goalData, config);

  console.log(`response: ${response}`);

  return response.data;
};

const goalService = { createGoal };

export default goalService;
