import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  _id: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export async function verifyAuthToken(token: string) {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded; // contains _id and other payload fields
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
}