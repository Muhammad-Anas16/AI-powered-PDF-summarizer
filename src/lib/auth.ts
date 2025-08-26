import jwt, { JwtPayload } from "jsonwebtoken";

export interface DecodedToken extends JwtPayload {
  id: string; // match payload from login
  email?: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export function verifyAuthToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return null;
  }
}