import axios from "axios";
import { instance } from "../App";
import {
  UserCreateInput,
  UserCreateResponseSchema,
  UserCreateResponse,
  UserLoginInput,
  UserLoginResponse,
  UserLoginResponseSchema,
} from "../schemas/User";

export const createUser = async (
  user: UserCreateInput,
): Promise<UserCreateResponse> => {
  try {
    const response = await instance.post("/users/register", user);
    return UserCreateResponseSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Server error:", error.response.status);
        console.log("Server error body:", error.response.data); // add this
      } else if (error.request) {
        console.log("No response received");
      }
    } else {
      console.log("Unknown error:", error);
    }
    throw error;
  }
};
export const loginUser = async (
  user: UserLoginInput,
): Promise<UserLoginResponse> => {
  try {
    const response = await instance.post("/users/login", user);
    return UserLoginResponseSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log("Server error:", error.response.status);
        console.log("Server error body:", error.response.data); // add this
      } else if (error.request) {
        console.log("No response received");
      }
    } else {
      console.log("Unknown error:", error);
    }
    throw error;
  }
};
