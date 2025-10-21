let memoryValue = 0;
let memoryActive = false; // Track if memory is being used
const display = document.getElementById('display');
const memoryIndicator = document.getElementById('memoryIndicator');

// Function to update memory indicator
function updateMemoryIndicator() {
    if (memoryActive) {
        memoryIndicator.textContent = 'M';
    } else {
        memoryIndicator.textContent = '';
    }
}

function appendToDisplay(value) {
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += value;
}

// Function to clear the display
function clearDisplay() {
    display.value = '';
}

// Function to calculate the result
function calculate() {
    try {
        let expression = display.value;
        let result = eval(expression);
        if (!isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = result;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Function ±
function toggleSign() {
    if (display.value !== '' && display.value !== 'Error') {
        if (!isNaN(parseFloat(display.value))) {
            display.value = (parseFloat(display.value) * -1).toString();
        }
    }
}

// Function 1/x
function reciprocal() {
    if (display.value !== '' && display.value !== 'Error') {
        try {
            let value = parseFloat(display.value);
            if (value === 0) {
                display.value = 'Error';
            } else {
                display.value = (1 / value).toString();
            }
        } catch (error) {
            display.value = 'Error';
        }
    }
}

// Function x²
function square() {
    if (display.value !== '' && display.value !== 'Error') {
        try {
            let value = parseFloat(display.value);
            display.value = (value * value).toString();
        } catch (error) {
            display.value = 'Error';
        }
    }
}

// √
function squareRoot() {
    if (display.value !== '' && display.value !== 'Error') {
        try {
            let value = parseFloat(display.value);
            if (value < 0) {
                display.value = 'Error';
            } else {
                display.value = Math.sqrt(value).toString();
            }
        } catch (error) {
            display.value = 'Error';
        }
    }
}

function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
}
function containsOperators(value) {
    return /[+\-*/]/.test(value);
}

// Memory functions
// MS
function memStore() {
    if (display.value !== '' && display.value !== 'Error') {
        if (isValidNumber(display.value) && !containsOperators(display.value)) {
            memoryValue = parseFloat(display.value);
            memoryActive = true;
            updateMemoryIndicator();
            console.log("Stored in memory: " + memoryValue);
        } else {
            console.log("Cannot store equation in memory");
        }
    }
}

// MC
function memClear() {
    memoryValue = 0;
    memoryActive = false;
    updateMemoryIndicator();
    console.log("Memory cleared");
}

// MR
function memRecall() {
    display.value = memoryValue.toString();
    console.log("Recalled from memory: " + memoryValue);
}
// M+
function memAdd() {
    if (display.value !== '' && display.value !== 'Error') {
        if (isValidNumber(display.value) && !containsOperators(display.value)) {
            memoryValue += parseFloat(display.value);
            memoryActive = true;
            updateMemoryIndicator();
            console.log("Added to memory. New value: " + memoryValue);
        } else {
            console.log("Cannot add equation to memory");
        }
    }
}
// Initialize the display
window.onload = function() {
    clearDisplay();
    console.log("Calculator initialized");
};