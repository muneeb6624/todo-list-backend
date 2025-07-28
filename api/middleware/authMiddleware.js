const jwt = require('jsonwebtoken');
const { User } = require('../../database/models/User');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    try {
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
module.exports = protect;
