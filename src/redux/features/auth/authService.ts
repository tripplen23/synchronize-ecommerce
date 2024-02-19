import axiosConfig from "../../utils/axiosConfig";
import { LoginType } from "../../../misc/authType";

// DOCS: Login -> User login
const login = async (userData: LoginType) => {
  const response = await axiosConfig.post("auth/login", userData);

  return response.data;
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
  localStorage.removeItem("user");
  localStorage.removeItem("userDetails");
};

const authService = {
  getUser,
  logout,
  login,
};

export default authService;
