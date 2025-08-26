"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import NavLink from "./navLink";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ✅ Match models/User.ts (name, email, password only)
const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
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
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onRegister: SubmitHandler<RegisterInputs> = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/register", data);

      toast.success("🎉 Account created successfully! Please log in.");
      reset();

      router.push("/sign-in");
    } catch (err) {
      const error = err as AxiosError<{ error?: string; message?: string }>;
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

      <form onSubmit={handleSubmit(onRegister)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            placeholder="John Doe"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            placeholder="you@example.com"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
          className="w-full bg-green-500 text-white rounded-lg py-3 font-semibold hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
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