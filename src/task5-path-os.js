// Task 5 - Using Path & OS Modules
// Name: Abdul Hadi Asad

const path = require('path');
const os = require('os');
const fs = require('fs');

console.log('=== TASK 5: Path & OS Modules ===\n');

// 1. Display the current file name
console.log('1. CURRENT FILE INFORMATION:');
console.log('   File name:', path.basename(__filename));
console.log('   Full path:', __filename);
console.log('   Directory:', __dirname);
console.log();

// 2. Create a joined path leading to a mock resource
console.log('2. JOINED PATH EXAMPLE:');
const mockResourcePath = path.join(__dirname, 'data', 'users', 'profile.json');
console.log('   Mock resource path:', mockResourcePath);
console.log('   Path separator:', path.sep);
console.log();

// More path examples
const configPath = path.join(__dirname, '..', 'config', 'settings.json');
console.log('   Config path (parent dir):', configPath);
console.log('   Path extension:', path.extname('profile.json'));
console.log('   Path basename:', path.basename(mockResourcePath));
console.log('   Path dirname:', path.dirname(mockResourcePath));
console.log();

// 3. Display platform information and memory details
console.log('3. PLATFORM INFORMATION:');
console.log('   Operating System:', os.platform());
console.log('   OS Type:', os.type());
console.log('   OS Release:', os.release());
console.log('   Architecture:', os.arch());
console.log('   CPU Cores:', os.cpus().length);
console.log('   CPU Model:', os.cpus()[0].model);
console.log();

console.log('4. MEMORY DETAILS:');
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const usedMemory = totalMemory - freeMemory;

console.log('   Total Memory:', (totalMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('   Free Memory:', (freeMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('   Used Memory:', (usedMemory / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('   Memory Usage:', ((usedMemory / totalMemory) * 100).toFixed(2), '%');
console.log();

console.log('5. USER INFORMATION:');
console.log('   Username:', os.userInfo().username);
console.log('   Home Directory:', os.homedir());
console.log('   Temp Directory:', os.tmpdir());
console.log();

// 4. List all files in the current directory and display their extensions
console.log('6. FILES IN CURRENT DIRECTORY (src):');
const files = fs.readdirSync(__dirname);

files.forEach(file => {
    const fullPath = path.join(__dirname, file);
    const stats = fs.statSync(fullPath);
    const extension = path.extname(file);
    const fileType = stats.isDirectory() ? '[DIR]' : '[FILE]';
    
    console.log(`   ${fileType} ${file}`);
    if (!stats.isDirectory() && extension) {
        console.log(`         Extension: ${extension}`);
    }
});

console.log();
console.log('=== END OF TASK 5 ===');
