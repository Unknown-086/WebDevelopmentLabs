# CSS Animation Showcase

A collection of five stunning pure CSS animations demonstrating advanced animation techniques without any JavaScript. Each animation showcases different CSS properties and keyframe techniques to create engaging visual effects.

## 🎯 Animations Included

### 1. **Pacman Animation**
- Classic arcade-style Pacman character with mouth-opening animation
- Dot-eating effect with synchronized background movement
- Responsive design that works across all screen sizes
- Features: CSS `conic-gradient`, `transform`, custom properties

### 2. **Bouncing Ball**
- Realistic physics-based bouncing ball with decreasing bounce height
- Gradient shading for 3D effect
- Smooth horizontal movement with vertical bouncing
- Features: `cubic-bezier` timing functions, `radial-gradient`

### 3. **Mars Rocket Landing**
- Complex space-themed animation with rocket landing sequence
- Animated alien tentacles and flag deployment
- Planet rotation with surface details and craters
- Features: Nested animations, `transform-origin`, complex keyframes

### 4. **Analog Clock**
- Fully functional analog clock with real-time hour, minute, and second hands
- Customizable starting time with CSS variables
- Smooth rotation animations with proper timing
- Features: CSS custom properties, `steps()` function, calculated delays

### 5. **Sun & Moon Cycle**
- Beautiful day/night transition with color-changing sky
- Rotating celestial bodies (sun and moon) with glowing effects
- Twinkling stars that appear during night phase
- Features: Multiple layered animations, `box-shadow` effects, gradient transitions

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in any modern web browser
3. **Enjoy the animations!** No build process required

### Using Live Server (Recommended)
```bash
# If using VS Code with Live Server extension
1. Right-click on index.html
2. Select "Open with Live Server"
3. Animations will auto-refresh on code changes
```

## 📁 Project Structure

```
web-animation-playground/
├── index.html              # Main HTML file with all animations
├── styles/
│   ├── main.css           # Global styles, layout, and CSS variables
│   ├── pacman.css         # Pacman animation styles
│   ├── bouncing-ball.css  # Physics-based bouncing ball
│   ├── mars-rocket.css    # Complex Mars landing sequence
│   ├── clock.css          # Analog clock with real-time animation
│   └── sun-moon.css       # Day/night cycle with celestial bodies
└── README.md              # Project documentation
```

## 🎨 Technical Highlights

### CSS Features Demonstrated
- **Keyframe Animations**: Complex multi-step animations
- **Transform Properties**: Rotate, translate, scale transformations
- **CSS Custom Properties**: Dynamic values and calculations
- **Gradient Effects**: Linear, radial, and conic gradients
- **Timing Functions**: Cubic-bezier curves for realistic motion
- **Pseudo-elements**: Creative use of `::before` and `::after`
- **Box-shadow**: Multiple shadows for lighting effects
- **CSS Variables**: Dynamic animation timing and positioning

### Animation Techniques
- **Physics Simulation**: Realistic bouncing with gravity
- **Synchronized Animations**: Multiple elements moving in harmony
- **State Transitions**: Smooth color and shape changes
- **Responsive Design**: Animations work on all screen sizes
- **Performance Optimized**: GPU-accelerated transforms only

## 🎓 Educational Value

Perfect for learning:
- **CSS Animation Fundamentals**: Keyframes, timing, easing
- **Advanced Selectors**: Pseudo-elements and pseudo-classes
- **Responsive Design**: Viewport units and flexible layouts
- **Performance**: Hardware acceleration and optimization
- **Creative Coding**: Artistic expression through code

## 🛠️ Customization

Each animation is modular and can be easily customized:

```css
/* Example: Modify Pacman speed */
.pacman-scene {
  animation: move 3s linear infinite; /* Change from 6s to 3s */
}

/* Example: Change clock starting time */
.clock {
  --setTimeHour: 3;    /* Set to 3 o'clock */
  --setTimeMinute: 15; /* Set to 15 minutes */
}

/* Example: Adjust ball bounce height */
@keyframes ball-bounce {
  0% { top: 0; }
  5% { top: 300px; } /* Increase bounce height */
}
```

## 📱 Responsive Design

All animations are built with mobile-first responsive design:
- **Viewport units** (`vw`, `vh`, `vmin`) for scaling
- **Flexible containers** that adapt to screen size
- **Touch-friendly** interactions and hover effects
- **Performance optimized** for mobile devices

## 🎉 Acknowledgments

- Inspired by classic arcade games and space exploration
- Built with modern CSS techniques and best practices
- Designed for educational purposes and creative inspiration

