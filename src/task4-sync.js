// Task 4 - Synchronous File Operations
// Name: Abdul Hadi Asad

const fs = require('fs');
const path = require('path');

console.log('1. Start of synchronous operations');

// Write text to a file synchronously
const filePath = path.join(__dirname, 'output-sync.txt');
const content = 'Hello! This is synchronous file writing.\nNode.js blocks execution until this completes.';

fs.writeFileSync(filePath, content);
console.log('2. File written synchronously');

// Read the file back synchronously
const readContent = fs.readFileSync(filePath, 'utf-8');
console.log('3. File read synchronously');

// Display the content
console.log('4. Content from file:');
console.log(readContent);

console.log('5. End of synchronous operations');
