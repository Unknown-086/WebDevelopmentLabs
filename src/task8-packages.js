// Task 8 - Using Third Party Packages
// Name: Abdul Hadi Asad

// Import the chalk package for colorful console output
const chalk = require('chalk');

console.log(chalk.blue('=== TASK 8: Using Third Party Packages ===\n'));

// Demonstrate various chalk features
console.log(chalk.green('Success:'), 'Chalk package installed successfully!');
console.log(chalk.yellow('Warning:'), 'This is a warning message');
console.log(chalk.red('Error:'), 'This is an error message');
console.log(chalk.cyan('Info:'), 'This is an info message\n');

// Using background colors
console.log(chalk.bgGreen.black(' SUCCESS '), 'Operation completed');
console.log(chalk.bgRed.white(' ERROR '), 'Something went wrong');
console.log(chalk.bgYellow.black(' WARNING '), 'Proceed with caution\n');

// Combining styles
console.log(chalk.bold('Bold text'));
console.log(chalk.italic('Italic text'));
console.log(chalk.underline('Underlined text'));
console.log(chalk.bold.green('Bold and green'));
console.log(chalk.bgBlue.yellow.bold(' Styled Background '), '\n');

// Creating styled messages
const success = chalk.green.bold;
const info = chalk.blue;
const warning = chalk.yellow;

console.log(success('Server started successfully'));
console.log(info('Listening on port 3000'));
console.log(warning('Development mode enabled\n'));

// Practical example: Log levels
function log(level, message) {
    const timestamp = new Date().toLocaleTimeString();
    
    switch(level) {
        case 'success':
            console.log(chalk.green(`[${timestamp}]`), chalk.green.bold('SUCCESS'), message);
            break;
        case 'error':
            console.log(chalk.red(`[${timestamp}]`), chalk.red.bold('ERROR'), message);
            break;
        case 'warning':
            console.log(chalk.yellow(`[${timestamp}]`), chalk.yellow.bold('WARNING'), message);
            break;
        case 'info':
            console.log(chalk.cyan(`[${timestamp}]`), chalk.cyan.bold('INFO'), message);
            break;
        default:
            console.log(`[${timestamp}]`, message);
    }
}

console.log(chalk.magenta('=== Custom Logger Example ==='));
log('info', 'Application started');
log('success', 'Database connected');
log('warning', 'Memory usage is high');
log('error', 'Failed to load configuration');

console.log('\n' + chalk.blue('=== Package Info ==='));
console.log('Package name:', chalk.bold('chalk'));
console.log('Version:', chalk.bold('4.1.2'));
console.log('Purpose:', chalk.bold('Terminal string styling'));
console.log('Documentation:', chalk.underline('https://www.npmjs.com/package/chalk'));

console.log('\n' + chalk.green.bold('Task 8 Complete!'));
console.log(chalk.gray('Third-party package successfully integrated and tested.\n'));
