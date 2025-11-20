// Task 4 - Comparing Sync vs Async Side-by-Side
// Name: Abdul Hadi Asad

const fs = require('fs');
const path = require('path');

console.log('=== COMPARISON: Observe the execution order ===\n');

// SYNCHRONOUS
console.log('[SYNC] Starting synchronous file write...');
fs.writeFileSync(path.join(__dirname, 'compare-sync.txt'), 'Synchronous content');
console.log('[SYNC] File written - execution was blocked until complete');

// ASYNCHRONOUS
console.log('[ASYNC] Starting asynchronous file write...');
fs.writeFile(path.join(__dirname, 'compare-async.txt'), 'Asynchronous content', (err) => {
    if (!err) {
        console.log('[ASYNC] File written - this callback runs later');
    }
});

console.log('[SYNC] This runs immediately after sync operation');
console.log('[ASYNC] This runs immediately WITHOUT waiting for async operation\n');

setTimeout(() => {
    console.log('=== Notice: Async callback executed after synchronous code finished ===');
}, 100);