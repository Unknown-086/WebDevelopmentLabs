# Event Planner

A modern, feature-rich event management application built with React and Vite. Manage your guest lists efficiently with an intuitive interface, dark mode support, and persistent data storage.

## Features

### Guest Management
- **Add Guests**: Quick modal-based form to add new guests with name, email, phone, and address
- **Edit Guests**: Update guest information with a user-friendly interface
- **Remove Guests**: Delete guests from your event list
- **VIP Tracking**: Mark important guests as VIPs with a special diamond indicator

### Status Tracking
- **Confirmation Status**: Track which guests have confirmed their attendance
- **RSVP Management**: Monitor RSVP responses separately from confirmations
- **Real-time Statistics**: Dashboard showing total guests, confirmed, pending, RSVP count, and VIP guests

### Search & Filter
- **Search Functionality**: Find guests quickly by name or email
- **Multiple Filters**: 
  - All Guests
  - Confirmed Only
  - Pending Only
  - RSVP Yes
  - VIP Only

### User Experience
- **Dark Mode**: Toggle between light and dark themes with automatic persistence
- **Persistent Storage**: All data saved to browser's local storage
- **Responsive Design**: Clean, modern interface that works across devices
- **Visual Feedback**: Status badges, hover effects, and smooth transitions

## Technology Stack

- **React 19.2.0**: Modern UI framework with hooks
- **Vite 7.2.4**: Fast build tool and development server
- **React Icons**: Beautiful icon library (HeroIcons 2)
- **Local Storage API**: Client-side data persistence
- **CSS3**: Custom styling with modern features

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd labThirteen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/
│   ├── AddGuestModal.jsx      # Modal for adding new guests
│   ├── EditGuestModal.jsx     # Modal for editing guest info
│   ├── FilterBar.jsx          # Search and filter controls
│   ├── GuestList.jsx          # Guest cards display
│   └── RSVPSummary.jsx        # Statistics dashboard
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── index.css                   # Global styles
```

## Features in Detail

### Guest Card
Each guest card displays:
- Avatar with initials
- Full contact information (name, email, phone, address)
- Status badges (Confirmed, RSVP, VIP)
- Action buttons (Confirm, RSVP, VIP Toggle, Edit, Remove)

### Dark Mode
- Seamless theme switching with a toggle button
- Preference saved automatically to local storage
- All components fully themed for both light and dark modes
- Icon glow effects in dark mode for enhanced visual appeal

### Data Persistence
- All guest data automatically saved to browser's local storage
- Theme preference persists across sessions
- No data loss on page refresh or browser restart

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.