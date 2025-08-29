export const runtime = "nodejs"; // Ensure Node.js runtime

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectMongo();
    const { name, email, password } = await req.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, code: "VALIDATION_ERROR", message: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, code: "USER_EXISTS", message: "User already exists." },
        { status: 403 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save user
    let newUser = new User({ name, email, password: hashedPassword });
    newUser = await newUser.save();

    // Log full user after save
    console.log("✅ New user registered:", newUser);

    // Return user in response
    return NextResponse.json(
      { success: true, code: "USER_CREATED", message: "User registered successfully", user: newUser },
      { status: 201 }
    );

  } catch (err: unknown) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { success: false, code: "SERVER_ERROR", message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}