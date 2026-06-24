import axios from "axios";
import { instance } from "../App";
import {
  UserCreateInput,
  userSchema,
  User,
  UserLoginInput,
  UserLoginResponseSchema,
} from "../schemas/User";

export const createUser = async (user: UserCreateInput): Promise<User> => {
  try {
    const response = await instance.post("/users/register", user);
    return userSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Server error:", error.response.status);
        console.log("Server error body:", error.response.data);
      } else if (error.request) {
        console.log("No response received");
      }
    } else {
      console.log("Unknown error:", error);
    }
    throw error;
  }
};
export const loginUser = async (user: UserLoginInput): Promise<User> => {
  try {
    const response = await instance.post("/users/login", user);
    const data = UserLoginResponseSchema.parse(response.data);
    localStorage.setItem("access_token", data.access_token);
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Server error:", error.response.status);
        console.log("Server error body:", error.response.data);
      } else if (error.request) {
        console.log("No response received");
      }
    } else {
      console.log("Unknown error:", error);
    }
    throw error;
  }
};
