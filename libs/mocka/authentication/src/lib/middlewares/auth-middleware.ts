import { RedisClient } from '@mocka/core';
import { Request } from 'express';

export const authMiddleware = async (req: any, res, next) => {
  console.log(`******* [start - authMiddleware - ${req.url}] *******`);

  if (!req.session.user) {
    return res.status(401).send('Access denied.');
  }

  try {
    const theUser = await RedisClient.get(`user:${req.session.user}`);
    if (!theUser) {
      return res.status(404).send('User not found.');
    }

    req.user = JSON.parse(theUser); // Attach user to request object
    next();
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
};
