import axios from "axios";
import { API_ENDPOINTS } from "../api_endpoints";
import axiosClient from "./axiosClient";
import { Product } from "@/types/products";

export const fetchProductByBarcode = async (barcode: string) => {
  try {
    const response = await axios.get(`/api/product?barcode=${barcode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Product not found or API error.");
  }
};

export const saveProduct = async (productData: Product) => {
  return await axiosClient.post(API_ENDPOINTS.PRODUCTS, {
    ...productData,
    category: "Uncategorized",
  });
};
