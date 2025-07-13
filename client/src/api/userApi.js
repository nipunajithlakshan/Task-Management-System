
import axios from "./axiosInstance";

// Registration (no token needed)
export const registerUser = async (data) => {
  return await axios.post("/register", data);
};

// Sign in (no token needed yet)
export const userSignin = async (data) => {
  return await axios.post("/signin", data);
};
export const getUserById = async (id) => {
  return await axios.get(`/view-user`);
};
