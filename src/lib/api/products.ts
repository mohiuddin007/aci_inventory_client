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

export const scanProductByBarcode = async (barcode: string) => {
  try {
    const response = await axiosClient.get(`${API_ENDPOINTS.PRODUCTS}/scan/${barcode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    throw new Error("Product not found or API error.");
  }
};

export const saveProduct = async (productData: Product) => {
  try {
    const response = await axiosClient.post(API_ENDPOINTS.PRODUCTS, productData);
    return response.data;
  } catch (error) {
    console.error("Error saving product:", error);
    throw new Error("Failed to save product.");
  }
};

export const fetchAllProducts = async (category?: string) => {
  try {
    const url = category
      ? `${API_ENDPOINTS.PRODUCTS}?category=${category}`
      : API_ENDPOINTS.PRODUCTS;
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products.");
  }
};

export const updateProductCategory = async (
  barcode: string,
  newCategory: string
) => {
  try {
    const response = await axiosClient.put(
      `${API_ENDPOINTS.PRODUCTS}/update-category/${barcode}`,
      {
        category: newCategory,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product category:", error);
    throw new Error("Failed to update category.");
  }
};
