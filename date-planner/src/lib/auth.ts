import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string;

// Generate a JWT token for a given user ID, with a 7-day expiration.
export function signToken(userId: string) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '7d', issuer: 'date-planner' });
}

// Verify a JWT token, returning the decoded user ID if valid or null if invalid.
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { userId: string };
  } catch (err) {
    return null;
  }
}