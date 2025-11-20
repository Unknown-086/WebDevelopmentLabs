# Lab 10 — Introduction to Node.js

**Student:** Abdul Hadi Asad  
**Course:** Web Engineering  
**Date:** November 20, 2025

## Overview
This lab introduces Node.js fundamentals including modules, npm, file system operations, events, and HTTP servers.

## Setup

```bash
# Verify installation
node -v
npm -v

# Install dependencies
npm install
```

## Tasks Completed

### Task 1: Hello Node
**File:** `src/task1-hello-node.js`  
Demonstrates asynchronous behavior and Node's event loop.
```bash
node src/task1-hello-node.js
```

### Task 2: Modules & Importing
**Files:** `src/task2-utils.js`, `src/task2-main.js`  
Custom module with `greet()` and `reverseString()` functions.
```bash
node src/task2-main.js
```

### Task 3: npm Scripts
**File:** `package.json`  
Added npm scripts for running and auto-restarting with nodemon.
```bash
npm run start-2    # Run normally
npm run dev-2      # Run with nodemon
```

### Task 4: File System Operations
**Files:** `src/task4-sync.js`, `src/task4-async.js`, `src/task4-comparison.js`  
Demonstrates sync vs async file operations.
```bash
node src/task4-sync.js
node src/task4-async.js
node src/task4-comparison.js
```

### Task 5: Path & OS Modules
**File:** `src/task5-path-os.js`  
Displays system information, memory details, and path operations.
```bash
node src/task5-path-os.js
```

### Task 6: Events & EventEmitter
**File:** `src/task6-events.js`  
Custom events with listeners and async event emissions.
```bash
node src/task6-events.js
```

### Task 7: HTTP Server
**File:** `src/task7-http-server.js`  
Basic HTTP server with routing and JSON responses.
```bash
node src/task7-http-server.js
# Visit: http://localhost:3000
```

### Task 8: Third-Party Packages
**Files:** `src/task8-packages.js`, `src/task8-express-server.js`  
Using chalk for styling and Express.js for web server.
```bash
node src/task8-packages.js
node src/task8-express-server.js  # Visit: http://localhost:3000
```

## Dependencies

- **nodemon** (dev) - Auto-restart during development
- **chalk** - Terminal styling
- **express** - Web framework

## Key Learnings

- Node.js runs JavaScript outside the browser  
- Event loop handles asynchronous operations  
- Modules organize code with `require()` and `module.exports`  
- npm manages packages and scripts  
- Async operations prevent blocking  
- EventEmitter enables custom events  
- HTTP servers can be built with native `http` or Express  
- Third-party packages extend functionality