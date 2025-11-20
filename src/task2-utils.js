// Task 2 - Module with two functions
// Name: Abdul Hadi Asad

// Function 1: Returns a greeting message
function greet(name) {
    return `Hello, ${name}! Welcome to Node.js!`;
}

// Function 2: Returns a string reversed
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Export both functions
module.exports = {
    greet,
    reverseString
};
