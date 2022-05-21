import axios from "axios";

const API_URL = "api/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    //axios를 사용하면 response값은 response.data에 저장 됨.
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (loginInfo) => {
  const response = await axios.post(`${API_URL}login`, loginInfo);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  logout,
  login,
};

export default authService;
