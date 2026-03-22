import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET as string;

export function signToken(userId: string) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '7d', issuer: 'date-planner' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { userId: string };
  } catch (err) {
    return null;
  }
}