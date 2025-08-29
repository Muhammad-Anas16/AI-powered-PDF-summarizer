import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectMongo();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          error: true,
          message: "Email and password are required",
          data: null,
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).lean();
    console.log("Login attempt:", email, "User found:", !!user);

    if (!user) {
      return NextResponse.json(
        {
          error: true,
          message: "User is not registered",
          data: null,
        },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: true,
          message: "Invalid password",
          data: null,
        },
        { status: 403 }
      );
    }

    const tokenPayload = { id: user._id.toString(), email: user.email };
    const token = jwt.sign(tokenPayload, process.env["AUTH-SECRET"] as string);

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        error: false,
        message: "User login successfully",
        data: { user: userWithoutPassword, token },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      {
        error: true,
        message: "Internal server error",
        data: null,
      },
      { status: 500 }
    );
  }
}