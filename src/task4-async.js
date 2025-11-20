// Task 4 - Asynchronous File Operations
// Name: Abdul Hadi Asad

const fs = require('fs');
const path = require('path');

console.log('1. Start of asynchronous operations');

// Write text to a file asynchronously
const filePath = path.join(__dirname, 'output-async.txt');
const content = 'Hello! This is asynchronous file writing.\nNode.js continues executing while this runs in the background.';

fs.writeFile(filePath, content, (err) => {
    if (err) {
        console.error('Error writing file:', err);
        return;
    }
    console.log('3. File written asynchronously (callback executed)');
    
    // Read the file asynchronously (inside the write callback to ensure file exists)
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('4. File read asynchronously (callback executed)');
        
        // Display the content when reading completes
        console.log('5. Content from file:');
        console.log(data);
        console.log('6. End of async operations');
    });
});

console.log('2. Async operations started - Node continues without blocking');