"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/utils/validation";
import { LoginCredentials, SignupCredentials } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "@/lib/api/auth";
import { useAuth } from "@/context/AuthContext"; // Import the auth context

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const { login } = useAuth();
  const isLogin = type === "login";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials | SignupCredentials>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  const mutation = useMutation({
    mutationFn: isLogin ? loginUser : registerUser,
    onSuccess: (data) => {
      login(data.access_token); // Save token and redirect
    },
    onError: (error) => {
      console.error("Authentication failed:", error);
    },
  });

  const onSubmit = (data: LoginCredentials | SignupCredentials) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              {...register("username")}
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter Username"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              {...register("password")}
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
