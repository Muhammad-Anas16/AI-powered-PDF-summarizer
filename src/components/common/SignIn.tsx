"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import NavLink from "./navLink";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginInputs = yup.InferType<typeof loginSchema>;

export function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>({ resolver: yupResolver(loginSchema) });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onLogin: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    toast.info("🔐 Logging you in...");

    try {
      // ✅ Use your deployed backend URL
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE || "https://summerizer-api.vercel.app/"}api/auth/login`,
        data
      );

      const { error, message, data: resData } = response.data;

      if (error) {
        toast.error(message || "Login failed");
        return;
      }

      const token = response.data.token;
      const user = response.data.user;

      // Save token in localStorage
      Cookies.set("token", token, { expires: 7 });


      // Decode token and log everything
      const decoded = jwtDecode(token);
      // console.log("Decoded Token:", decoded);
      // console.log("User Data:", user);

      toast.success("🎉 Login successful!");
      reset();
      router.replace("/"); // redirect after login
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
        {/* Email */}
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

        {/* Password */}
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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white rounded-lg py-2 font-semibold hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Don’t have an account?{" "}
        <NavLink
          href="/sign-up"
          className="text-green-600 font-semibold hover:underline"
        >
          Register
        </NavLink>
      </p>
    </div>
  );
}