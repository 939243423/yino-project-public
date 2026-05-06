const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  // usually "Bearer <token>"
  const tokenParts = token.split(' ');
  const tokenValue = tokenParts.length === 2 ? tokenParts[1] : tokenParts[0];

  jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  console.log(`[Auth] Checking admin role for user: ${req.userId}, Role: ${req.userRole}`);
  if (req.userRole !== 'admin') {
    console.warn(`[Auth] Access denied for user: ${req.userId}, Role: ${req.userRole}`);
    return res.status(403).json({ message: 'Require Admin Role!' });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
