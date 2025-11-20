// Task 6 - Events & EventEmitter
// Name: Abdul Hadi Asad

const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

console.log('=== TASK 6: Events & EventEmitter ===\n');

// Create an event emitter
const myEmitter = new EventEmitter();

// 1. Register a listener for a custom event "login"
console.log('1. Setting up event listeners...\n');

myEmitter.on('login', (username) => {
    console.log(`User logged in: ${username}`);
    console.log(`  Timestamp: ${new Date().toLocaleTimeString()}`);
});

// Add another listener for the same event
myEmitter.on('login', (username) => {
    console.log(`Sending welcome email to: ${username}`);
});

// 2. Register a listener for "notify" event
myEmitter.on('notify', (message) => {
    console.log(`Notification: ${message}`);
});

// 3. Emit the events
console.log('2. Emitting "login" event...');
myEmitter.emit('login', 'Abdul Hadi');
console.log();

console.log('3. Emitting "notify" event...');
myEmitter.emit('notify', 'You have a new message!');
console.log();

// 4. Add a second listener that triggers after a delay
console.log('4. Setting up delayed listener...');
myEmitter.on('delayed-notification', (message) => {
    console.log(`Delayed notification received: ${message}`);
});

// Emit event after a delay
setTimeout(() => {
    console.log('\n5. Emitting delayed event (after 2 seconds)...');
    myEmitter.emit('delayed-notification', 'This message was delayed!');
}, 2000);

// Optional: Emit an event after an asynchronous file read completes
console.log('\n6. Setting up file read event listener...');

myEmitter.on('fileRead', (filename, content) => {
    console.log(`   File read complete: ${filename}`);
    console.log(`   Content length: ${content.length} characters`);
    console.log(`   First 50 characters: ${content.substring(0, 50)}...`);
});

// Read a file asynchronously and emit an event when done
const filePath = path.join(__dirname, 'task2-utils.js');
console.log('   Reading file asynchronously...');

fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    // Emit event when file read is complete
    myEmitter.emit('fileRead', 'task2-utils.js', data);
    
    console.log('\n=== END OF TASK 6 ===');
});

console.log('   File read initiated (waiting for completion)...\n');

// Demonstrating event emitter with multiple events
myEmitter.on('userData', (user) => {
    console.log(`User data received:`, user);
});

