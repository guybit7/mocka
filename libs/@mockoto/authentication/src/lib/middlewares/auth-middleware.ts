import * as jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const authMiddleware = async (req: any, res, next) => {
  try {
    console.log('********************authMiddleware - start************************');
    console.log(req.url);
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.tenantId = decoded.tenantId;
    console.log('********************authMiddleware -end ************************');
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
