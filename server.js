require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// CORS middleware
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  if (Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// Test routes
app.get('/', (req, res) => res.send('API Running'));

app.post('/test', (req, res) => res.json(req.body));

// Protected route example (requires authentication)
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Centralized error handler (must be last middleware)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
