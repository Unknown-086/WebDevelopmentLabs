// Simulated authentication middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }
  
  // Simulate token validation (in real app, verify JWT token)
  if (authHeader === 'Bearer valid-token') {
    req.user = { id: '123', name: 'Test User' }; // Attach user to request
    next();
  } else {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
