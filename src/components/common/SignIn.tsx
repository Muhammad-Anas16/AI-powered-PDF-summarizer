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
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";  // <-- Import NextAuth signIn

// ✅ Validation Schema
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
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Custom email/password login
  const onLogin: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    toast.info("🔐 Logging you in... Please wait.");

    try {
      const response = await axios.post(
        "https://next-auth-one-pi.vercel.app/api/auth/login", 
        { ...data, from: "web" }
      );

      const token = response.data?.token;
      if (!token) throw new Error("Token not found in response");

      // ✅ Store token in cookies
      Cookies.set("token", token, { secure: true, sameSite: "strict" });

      // ✅ Decode token (optional)
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);

      toast.success("🎉 Login successful!");
      reset();
      router.replace("/");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google OAuth using NextAuth
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" }); // <-- Correct way to trigger NextAuth Google login
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {/* Email/Password Login Form */}
      <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
        {/* Email Input */}
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

        {/* Password Input with Toggle */}
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white rounded-lg py-2 font-semibold hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Google Login */}
      {/* <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border rounded-lg py-2 font-semibold hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2 text-xl" />
          Login with Google
        </button>
      </div> */}

      {/* Link to Register */}
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