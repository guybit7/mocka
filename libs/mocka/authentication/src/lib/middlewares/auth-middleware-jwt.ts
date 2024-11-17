import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { RedisClient } from '@mocka/core';
const SECRET_KEY = process.env.SECRET_KEY as string;

// Middleware to check token and authenticate user
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Step 1: Get the token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Step 2: Verify the token
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    // Step 3: Attach the decoded user information to the request object
    console.log(decoded);
    const theUser = await RedisClient.get(`user:${decoded.userId}`);

    if (!theUser) {
      return res.status(404).send('User not found.');
    }
    req.user = JSON.parse(theUser);

    // Continue to the next middleware or route handler
    next();
  });
};
