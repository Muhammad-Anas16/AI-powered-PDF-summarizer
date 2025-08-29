import jwt, { JwtPayload } from "jsonwebtoken";

export interface DecodedToken extends JwtPayload {
  id: string;       // matches payload from login
  email?: string;   // optional email field
}

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET environment variable is missing");
}

export function signAuthToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET);
}

export function verifyAuthToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return null;
  }
}