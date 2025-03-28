const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Please authenticate' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id || decoded._id;
    const user = await User.findById(userId);

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = auth;
