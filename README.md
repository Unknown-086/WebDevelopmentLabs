# MERN Stack User Management

A full-stack application with React frontend and Express/MongoDB backend for managing users.

## Quick Start

### Prerequisites
- Node.js installed
- MongoDB running on `localhost:27017`

### Backend Setup
```bash
cd backend
npm install
node server.js
```
Server runs on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## User Schema
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "createdAt": "2025-11-13T19:00:57.920Z"
}
```

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Express.js
- **Database:** MongoDB + Mongoose
- **ID System:** Auto-incrementing IDs (starting from 1)