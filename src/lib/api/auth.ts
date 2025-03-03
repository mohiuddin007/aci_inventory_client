import { API_ENDPOINTS } from "../api_endpoints";
import axiosClient from "./axiosClient";

export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await axiosClient.post(API_ENDPOINTS.LOGIN, {
    username,
    password,
  });
  return response.data;
};

// register
export const registerUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await axiosClient.post(API_ENDPOINTS.SIGNUP, {
    username,
    password,
  });
  return response.data;
};
