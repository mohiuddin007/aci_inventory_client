import { API_ENDPOINTS } from "../api_endpoints";
import axiosClient from "./axiosClient";

export async function fetchCategories() {
  const response = await axiosClient.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
}

export async function saveCategory(data: { name: string }) {
  try {
    const response = await axiosClient.post(API_ENDPOINTS.CATEGORIES, data);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw new Error("Failed to add category.");
  }
}