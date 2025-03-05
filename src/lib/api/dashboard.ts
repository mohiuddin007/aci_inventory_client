import { API_ENDPOINTS } from "../api_endpoints";
import axiosClient from "./axiosClient";

export const fetchAnalytics = async () => {
  try {
    const response = await axiosClient.get(`${API_ENDPOINTS.DASHBOARD}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw new Error("Failed to fetch analytics.");
  }
};
