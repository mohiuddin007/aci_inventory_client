import { API_ENDPOINTS } from "../api_endpoints";
import axiosClient from "./axiosClient";

// Fetch categories
export async function fetchCategories() {
  const response = await axiosClient.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
}
