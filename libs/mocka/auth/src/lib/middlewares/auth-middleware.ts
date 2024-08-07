import User from '../models/user';

export const authMiddleware = async (req, res, next) => {
  console.log(`auth middleware ${req.session.user}`);
  if (!req.session.user) {
    return res.status(401).send('Access denied.');
  }

  try {
    const user = await User.findById(req.session.user);
    if (!user) {
      return res.status(404).send('User not found.');
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
};
