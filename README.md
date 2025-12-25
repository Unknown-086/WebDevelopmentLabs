# Lab 14: Book Dashboard App

A comprehensive React application demonstrating state management, context API, and modern UI design with Aceternity-inspired components.

## Features

### Core Functionality
- **Section 1: State with Objects** - Profile Editor with object state management
- **Section 2: Arrays of Objects** - Practice Book List with full CRUD operations
- **Section 3: Global State** - Role Context demonstration with useContext
- **Final Dashboard** - Full-featured Book Dashboard with role-based views

### Design & UI
- **Dark/Light Mode** - Fully responsive theme switching with persistent storage
- **Aceternity UI Components** - Professional, animated components
- **Framer Motion** - Heavy but professional animations throughout
- **Glassmorphism** - Modern glass-effect cards and backgrounds
- **Gradient Effects** - Beautiful color gradients and shimmer effects

### Role-Based Features
- **Admin View**: Full CRUD operations (Create, Read, Update, Delete books)
- **User View**: Read-only access to book collection
- **Dynamic UI**: Interface changes based on user role
- **Global State**: Role shared across all components via Context

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
LabFourteen/
├── src/
│   ├── components/
│   │   ├── Section1/
│   │   │   └── ProfileEditor.jsx       # Object state management
│   │   ├── Section2/
│   │   │   └── PracticeBookList.jsx    # Array operations
│   │   ├── Section3/
│   │   │   └── RoleSwitcher.jsx        # Context demo
│   │   ├── FinalProject/
│   │   │   └── BookDashboard.jsx       # Main dashboard
│   │   └── ui/
│   │       ├── Input.jsx               # Animated input component
│   │       ├── Button.jsx              # Multi-variant button
│   │       ├── Card.jsx                # Glass-effect cards
│   │       ├── Modal.jsx               # Animated modal
│   │       ├── Tabs.jsx                # Tabbed navigation
│   │       └── ThemeToggle.jsx         # Theme switcher
│   ├── context/
│   │   ├── RoleContext.jsx             # Role management
│   │   └── ThemeContext.jsx            # Theme management
│   ├── lib/
│   │   └── utils.js                    # Utility functions
│   ├── App.jsx                         # Main application
│   ├── main.jsx                        # Entry point
│   └── index.css                       # Global styles
├── tailwind.config.js                  # Tailwind configuration
├── postcss.config.js                   # PostCSS configuration
└── package.json
```

## Learning Objectives

### Section 1: Managing Objects in State
**Key Concepts:**
- Using `useState` with object data types
- Updating object properties with spread operator (`...`)
- Maintaining immutability in React state

**Example:**
```javascript
const [profile, setProfile] = useState({ name: '', age: '' });
setProfile({ ...profile, name: newName }); // Correct
```

### Section 2: Managing Arrays of Objects
**Key Concepts:**
- Managing lists with `useState`
- Using `map()` to render array items
- Using `filter()` to remove items
- Generating unique IDs with `Date.now()`
- Updating specific items by ID

**Example:**
```javascript
// Add item
setBooks([...books, newBook]);

// Delete item
setBooks(books.filter(book => book.id !== id));

// Update item
setBooks(books.map(book => 
  book.id === editId ? updatedBook : book
));
```

### Section 3: Global State with useContext
**Key Concepts:**
- Creating context with `createContext()`
- Providing context with `Context.Provider`
- Consuming context with `useContext()`
- Sharing state across components without prop drilling

**Example:**
```javascript
// Create context
const RoleContext = createContext();

// Provide context
<RoleProvider>
  <App />
</RoleProvider>

// Consume context
const { role, toggleRole } = useRole();
```

## UI Components

### Button Variants
- `default` - Primary action button
- `destructive` - Delete/warning actions
- `outline` - Secondary actions
- `ghost` - Minimal style
- `shimmer` - Animated gradient effect

### Card Variants
- `default` - Standard card
- `glass` - Glassmorphism effect
- `gradient` - Gradient background

### Animations
- Hover effects on all interactive elements
- Smooth page transitions
- Stagger animations for lists
- 3D card rotations
- Shimmer effects on buttons
- Floating animations for icons

## Key Features Explained

### Theme System
- Persistent storage using `localStorage`
- Automatic class toggling on `<html>` element
- Smooth transitions between themes
- Custom CSS variables for colors

### Role-Based Rendering
```javascript
{isAdmin ? (
  <Button onClick={handleDelete}>Delete</Button>
) : (
  <div>Read-only view</div>
)}
```

### Search & Filter
```javascript
const filteredBooks = useMemo(() => {
  return books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [books, searchQuery]);
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **clsx & tailwind-merge** - Utility functions

## Tips & Best Practices

### State Management
1. Always use spread operator for immutable updates
2. Use functional updates when new state depends on old state
3. Keep state as local as possible
4. Use Context for truly global state

### Performance
1. Use `useMemo` for expensive computations
2. Use `React.memo` for component memoization (when needed)
3. Avoid inline object/array creation in render

### Code Organization
1. One component per file
2. Group related components in folders
3. Separate UI components from business logic
4. Use custom hooks for reusable logic

## Review Questions

1. **Why do we use the spread operator when updating state?**
   - To maintain immutability and trigger re-renders

2. **What problems does useContext solve?**
   - Eliminates prop drilling
   - Shares state globally across components
   - Cleaner component hierarchy

3. **What are the benefits of splitting state and logic into components?**
   - Better code organization
   - Easier testing
   - Improved reusability
   - Better separation of concerns

## Bonus Features Implemented

- Search functionality
- Filter by title/author
- Persistent theme storage
- Heavy professional animations
- Glassmorphism effects
- Shimmer button effects
- 3D card animations
- Smooth transitions
- Empty state handling
- Loading states

## Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to your preferred platform
# (Vercel, Netlify, GitHub Pages, etc.)
```

## Additional Resources

- [React Documentation](https://react.dev)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Aceternity UI](https://ui.aceternity.com)

## Contributing

This is a learning project for Lab 14. Feel free to experiment and add your own features!

## License

MIT License - Feel free to use this project for learning purposes.

---

**Built with ❤️ using React, Framer Motion, and Tailwind CSS**

**Lab 14: Book Dashboard App** | Web Development Practice