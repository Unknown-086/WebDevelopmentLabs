# Web-Based Calculator

A fully functional web-based calculator with basic arithmetic operations, advanced mathematical functions, and memory capabilities.

## Features

### Basic Operations
- **Addition (+)** - Add two or more numbers
- **Subtraction (-)** - Subtract numbers
- **Multiplication (×)** - Multiply numbers
- **Division (÷)** - Divide numbers
- **Decimal Point (.)** - Enter decimal numbers

### Advanced Functions
- **1/x** - Calculate reciprocal (1 divided by the number)
- **x²** - Square the number
- **√** - Calculate square root
- **±** - Toggle between positive and negative values

### Memory Functions
- **MS** - Memory Store (saves the current number)
- **MR** - Memory Recall (retrieves the stored number)
- **M+** - Memory Add (adds current number to stored memory)
- **MC** - Memory Clear (clears the stored memory)
- **M Indicator** - Visual indicator showing when memory is active

### Other Functions
- **C** - Clear the display
- **=** - Calculate the result of the expression

## How to Use

### Basic Calculations
1. Click number buttons to enter numbers
2. Click operation buttons (+, -, ×, ÷) to select operations
3. Press **=** to see the result

**Example:** `8 + 4 - 1 × 5 ÷ 7 = 11.29`

### Advanced Functions

**Reciprocal (1/x):**
- Enter a number (e.g., 5)
- Click **1/x**
- Result: 0.2

**Square (x²):**
- Enter a number (e.g., 5)
- Click **x²**
- Result: 25

**Square Root (√):**
- Enter a number (e.g., 25)
- Click **√**
- Result: 5

**Toggle Sign (±):**
- Enter a number (e.g., 5)
- Click **±**
- Result: -5

### Memory Operations

**Store a Number:**
1. Enter a number (e.g., 42)
2. Click **MS** (Memory Store)
3. The **M** indicator appears in the display

**Recall from Memory:**
1. Click **MR** (Memory Recall)
2. The stored number appears in the display

**Add to Memory:**
1. Enter a number (e.g., 8)
2. Click **M+** (Memory Add)
3. The number is added to the stored memory value

**Clear Memory:**
1. Click **MC** (Memory Clear)
2. Memory is reset and the **M** indicator disappears

**Note:** Memory functions only work with numbers, not expressions. If you try to store "2+3", it won't be saved.

## Error Handling

The calculator displays **"Error"** in the following situations:
- Division by zero (e.g., 5 ÷ 0)
- Square root of a negative number (e.g., √-4)
- Invalid mathematical expressions

To clear an error, press **C** or start entering a new number.

## Getting Started

1. Open `index.html` in a web browser
2. Start calculating!

## Browser Compatibility

Works on all modern browsers:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## Technologies

- HTML5
- CSS3
- JavaScript (ES6)

---

**Note:** This calculator uses JavaScript's `eval()` function to evaluate mathematical expressions, allowing you to enter complex calculations like `8+4-1*5/7` and get the correct result following the order of operations.