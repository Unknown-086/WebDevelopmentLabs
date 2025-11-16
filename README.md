# Lab 8: Client-Side Storage APIs

This lab demonstrates the implementation and comparison of various client-side storage mechanisms in web browsers.

## Overview

A comprehensive exploration of browser storage APIs including localStorage, sessionStorage, IndexedDB, and Cache API, with a unified comparison dashboard.

## Implemented Tasks

### Task 1: localStorage API
**File:** `TaskOne.html`

Demonstrates persistent key-value storage using localStorage API.

**Features:**
- Save and retrieve user preferences (name and theme color)
- Persistent data storage across browser sessions
- Dynamic background color application
- Clear functionality to reset preferences

**Key Concepts:**
- `localStorage.setItem()` and `localStorage.getItem()`
- Persistent storage that survives browser restarts
- Simple key-value pair storage

---

### Task 2: sessionStorage API
**File:** `TaskTwo.html`

Demonstrates temporary session-based storage using sessionStorage API.

**Features:**
- Save and display favorite quotes
- Storage limited to current browser tab/session
- Data clears when tab is closed
- Clear functionality for immediate cleanup

**Key Concepts:**
- `sessionStorage.setItem()` and `sessionStorage.getItem()`
- Tab-specific storage
- Temporary data persistence

---

### Task 3: IndexedDB API
**File:** `TaskThree.html`

Demonstrates structured database storage using IndexedDB for complex data management.

**Features:**
- Full-featured task manager application
- Add, complete, and delete individual tasks
- Delete all tasks functionality
- Task completion tracking with visual feedback
- Persistent storage with structured data

**Key Concepts:**
- Object stores and transactions
- Asynchronous database operations
- CRUD operations (Create, Read, Update, Delete)
- Auto-incrementing primary keys
- Structured data storage

**Database Schema:**
- Database: `TaskDB` (version 1)
- Object Store: `tasks`
- Key Path: `id` (auto-increment)
- Fields: `id`, `text`, `completed`

---

### Task 4: Cache API & Service Workers
**File:** `TaskFour/TaskFour.html`, `TaskFour/sw.js`

Demonstrates offline-first web application using Cache API and Service Workers.

**Features:**
- Service Worker registration and lifecycle management
- Static asset caching for offline functionality
- Cache status monitoring
- Manual cache clearing
- Real-time service worker status display

**Key Concepts:**
- Service Worker installation and activation
- Cache-first network strategies
- Offline web application support
- Background script execution
- Request interception

**Cached Resources:**
- TaskFour.html
- styles.css
- offline-demo.css

---

### Task 5: Storage Comparison Dashboard
**File:** `TaskFive.html`

A unified dashboard comparing all three storage APIs with interactive demonstrations.

**Features:**
- Side-by-side comparison of localStorage, sessionStorage, and IndexedDB
- Add data to each storage type dynamically
- Real-time data display from all storage types
- Individual clear buttons for each storage type
- Global refresh and clear all functionality
- Displays data from Tasks 1-3 automatically

**Key Features:**
- Counter-based naming system (`data_1`, `data_2`, etc.)
- Scrollable storage display areas
- Responsive 3-column grid layout
- Clean, modern UI with visual hierarchy

---

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients, flexbox, and grid
- **Vanilla JavaScript**: ES6+ features, async/await
- **Web Storage API**: localStorage and sessionStorage
- **IndexedDB API**: Client-side database
- **Cache API**: Service Workers for offline support

## Design Features

- **Consistent Theme**: Green gradient color scheme (#11998e to #38ef7d)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Reusable Styles**: Centralized `styles.css` for all tasks
- **User Experience**: Clear visual feedback, smooth transitions, and intuitive interactions

## File Structure

```
LabEight/
├── README.md
├── styles.css                 # Main stylesheet (green theme)
├── TaskOne.html              # localStorage demo
├── TaskTwo.html              # sessionStorage demo
├── TaskThree.html            # IndexedDB task manager
├── TaskFour/
│   ├── TaskFour.html         # Cache API demo
│   ├── sw.js                 # Service Worker
│   └── offline-demo.css      # Task 4 specific styles
└── TaskFive.html             # Storage comparison dashboard
```

## Running the Project

1. Start a local development server (required for Service Workers):
   ```bash
   # Using Python
   python -m http.server 5500
   
   # Using Node.js
   npx http-server -p 5500
   
   # Using Live Server extension in VS Code
   ```

2. Navigate to:
   - Task 1: `http://127.0.0.1:5500/TaskOne.html`
   - Task 2: `http://127.0.0.1:5500/TaskTwo.html`
   - Task 3: `http://127.0.0.1:5500/TaskThree.html`
   - Task 4: `http://127.0.0.1:5500/TaskFour/TaskFour.html`
   - Task 5: `http://127.0.0.1:5500/TaskFive.html`

## Browser Compatibility

- **localStorage & sessionStorage**: All modern browsers
- **IndexedDB**: All modern browsers (IE10+)
- **Service Workers**: Chrome 40+, Firefox 44+, Edge 17+, Safari 11.1+
- **Note**: Service Workers require HTTPS or localhost

## Learning Outcomes

1. Understanding different client-side storage mechanisms
2. Choosing appropriate storage based on use case
3. Implementing CRUD operations with IndexedDB
4. Building offline-capable web applications
5. Managing service worker lifecycle
6. Creating responsive, user-friendly interfaces

## Storage Comparison

| Feature | localStorage | sessionStorage | IndexedDB | Cache API |
|---------|-------------|----------------|-----------|-----------|
| **Capacity** | ~5-10MB | ~5-10MB | ~50MB+ | Limited by disk |
| **Persistence** | Permanent | Tab session | Permanent | Permanent |
| **Data Type** | String only | String only | Structured data | Files/responses |
| **API Style** | Synchronous | Synchronous | Asynchronous | Asynchronous |
| **Use Case** | Simple preferences | Temporary data | Complex data | Offline assets |

---

**Created for Web Engineering Lab 8**  
*Exploring Client-Side Storage Technologies*