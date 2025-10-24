# Event Calendar 

A modern, feature-rich event calendar built with vanilla JavaScript, HTML, and CSS.

## Features

### Visual Design
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Today Highlighting**: Pulsing animation on current date with gradient badge
- **Smooth Animations**: Slide-in, fade-in, and hover effects throughout
- **Professional Typography**: Clean, readable fonts with proper spacing

### Core Functionality
- **Monthly View**: Full calendar grid with 6 weeks
- **Weekly View**: Focused view of current week with more space for events
- **Navigation**: Previous/Next month/week buttons and "Today" button
- **Event Storage**: All events saved in browser's localStorage

### Event Management
- **Create Events**: Click any date to add new events
- **Edit Events**: Modify existing events with full form support
- **Delete Events**: Remove events with confirmation
- **Event Details**: View complete event information in a modal
- **Event Time**: Optional time field for scheduling

### Event Categories
Six color-coded categories:
- **Work** (Purple gradient)
- **Personal** (Blue gradient)  
- **Important** (Red gradient)
- **Meeting** (Pink-Yellow gradient)
- **Health** (Green gradient)
- **Social** (Teal-Pink gradient)

### Advanced UX Features
- **Drag & Drop**: Drag events between dates to reschedule
- **Hover Tooltips**: Show event descriptions on hover
- **Quick Actions**: View, edit, and delete buttons on event hover
- **Event Descriptions**: Add detailed notes to events
- **Smart Click Detection**: Click date cells to add events, not when clicking events

### Visual Enhancements
- **Glass-morphism**: Buttons with backdrop blur effects
- **Gradient Themes**: Consistent purple gradient throughout
- **Custom Scrollbars**: Styled scrollbars matching the theme
- **Font Awesome Icons**: Professional icons for all actions
- **Smooth Transitions**: 0.3s ease transitions on all interactive elements

## How to Use

1. **View Calendar**: Open `index.html` in any modern browser
2. **Add Event**: Click any date cell to open the event form
3. **Edit Event**: Hover over an event and click the edit icon
4. **Delete Event**: Hover over an event and click the delete icon
5. **View Details**: Hover over an event and click the eye icon
6. **Drag Events**: Click and drag events to move them to different dates
7. **Switch Views**: Click "Weekly View" / "Monthly View" button
8. **Navigate**: Use Previous (<) and Next (>) buttons or "Today" button

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, animations, and flexbox/grid
- **JavaScript (ES6+)**: Vanilla JS with no frameworks
- **LocalStorage API**: Persistent data storage
- **Font Awesome**: Icon library (CDN)

### File Structure
```
├── index.html          # Main HTML structure
├── style.css           # All styles and animations
├── calender.js         # JavaScript logic and event handling
└── README.md           # Documentation
```

## Additional Features Implemented
- Event editing and deletion
- Event categories with color coding
- Drag and drop functionality
- Event descriptions and details view
- Tooltips on hover
- Smooth animations throughout
- Modern, polished UI design
- Responsive layout
- Custom icons

## Notes
- All event data is stored locally in browser's localStorage
- Events persist across browser sessions
- No server or backend required
- Fully client-side application

## Development
Built with vanilla JavaScript, CSS, and HTML following best practices for:
- Clean code organization
- Semantic HTML
- CSS modularity
- JavaScript event handling
- User experience design

