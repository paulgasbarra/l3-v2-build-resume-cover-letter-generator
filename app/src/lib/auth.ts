import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

// Compare a password with a hash
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

// Generate a JWT token
export function generateToken(payload: any): string {
  const secret = process.env.JWT_SECRET as string;
  return sign(payload, secret, { expiresIn: '7d' });
}

// Verify a JWT token
export function verifyToken(token: string): any {
  try {
    const secret = process.env.JWT_SECRET as string;
    return verify(token, secret);
  } catch (error) {
    return null;
  }
}

// Get current user from token
export function getCurrentUser(token: string): any {
  if (!token) return null;
  return verifyToken(token);
} 