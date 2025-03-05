import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext"; // Import AuthContext

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.warn("Session expired. Logging out...");
      const auth = useAuth(); 
      auth.logout(); 
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
