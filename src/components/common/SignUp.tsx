"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import NavLink from "./navLink";
import { Eye, EyeOff } from "lucide-react"; 
import { useRouter } from "next/navigation"; // <-- Added import

const registerSchema = yup.object({
  fullname: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  from: yup.string().default("summarizer"),
});

type RegisterInputs = yup.InferType<typeof registerSchema>;

export function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(registerSchema),
    defaultValues: { from: "summarizer" },
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // <-- Added

  const onRegister: SubmitHandler<RegisterInputs> = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE || "";
      const response = await axios.post(`${baseURL}api/auth/register`, data);

      console.log("Register Success:", response.data);
      reset();

      // Navigate to login page after success
      router.push("/sign-in");
    } catch (err) {
      const error = err as AxiosError<{ error?: string; message?: string }>;
      console.error("Register Error:", error);
      setErrorMessage(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullname")}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-400"
          />
          {errors.fullname && (
            <span className="text-red-500 text-sm">{errors.fullname.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-400"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white rounded-lg py-2 font-semibold hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <NavLink
          href="/sign-in"
          className="text-green-600 font-semibold hover:underline"
        >
          Login
        </NavLink>
      </p>
    </div>
  );
}