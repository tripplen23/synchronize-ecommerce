import axiosConfig from "../../utils/axiosConfig";
import { LoginType } from "../../../misc/authType";

// DOCS: Login -> User login
const login = async (userData: LoginType) => {
  const response = await axiosConfig.post("auth/login", userData);

  if (response.data) {
    localStorage.setItem("userIdDemo", JSON.stringify(1));
  }

  return response.data; // token
};

// DOCS: User -> Get a single
const getUser = async (userId: number) => {
  const response = await axiosConfig.get(`users/${userId}`);

  if (response.data) {
    localStorage.setItem("userDetails", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("loginToken");
  localStorage.removeItem("userDetails");
  localStorage.removeItem("userIdDemo");
};

const authService = {
  getUser,
  logout,
  login,
};

export default authService;
