# Lab Eleven - Express MongoDB REST API

A complete REST API built with Express.js and MongoDB featuring user and post management with advanced error handling.

## Features

- RESTful API architecture
- MongoDB integration with Mongoose ODM
- CRUD operations for Users and Posts
- Request/response logging middleware
- CORS support for cross-origin requests
- Simulated authentication middleware
- Advanced error handling with custom error messages
- Population of related data (Posts with Author details)

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**User Schema:**
```json
{
  "name": "string",
  "email": "string"
}
```

### Posts

- `POST /api/posts` - Create a new post
- `GET /api/posts` - Get all posts (with populated author details)
- `GET /api/posts/:id` - Get post by ID (with populated author details)
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/author/:authorId` - Get all posts by specific author

**Post Schema:**
```json
{
  "title": "string",
  "content": "string",
  "author": "ObjectId (reference to User)"
}
```

### Other Routes

- `GET /` - API status check
- `POST /test` - Echo request body
- `GET /protected` - Protected route requiring authentication token

## Middleware

### Request Logging
Logs timestamp, HTTP method, path, and request body for all incoming requests.

### Authentication
Simulated token-based authentication that checks for `Authorization: Bearer valid-token` header.

### Error Handling
Centralized error handler that provides customized responses for:
- **CastError** (400) - Invalid MongoDB ObjectId
- **ValidationError** (400) - Schema validation failures
- **Duplicate Key Error** (400) - Unique constraint violations
- **JWT Errors** (401) - Invalid or expired tokens
- **Default Errors** (500) - All other errors

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/labdb
```

3. Start MongoDB service

4. Run the server:
```bash
node server.js
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string

## Project Structure

```
├── config/
│   └── db.js              # MongoDB connection
├── cotrollers/
│   ├── userController.js  # User CRUD operations
│   └── postController.js  # Post CRUD operations
├── middleware/
│   ├── auth.js            # Authentication middleware
│   └── errorHandler.js    # Error handling middleware
├── models/
│   ├── User.js            # User schema
│   └── Post.js            # Post schema
├── routes/
│   ├── userRoutes.js      # User API routes
│   └── postRoutes.js      # Post API routes
├── .env                   # Environment variables
├── server.js              # Application entry point
└── package.json           # Dependencies
```