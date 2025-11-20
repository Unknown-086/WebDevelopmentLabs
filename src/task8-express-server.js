// Task 8 (Optional) - HTTP Server with Express
// Name: Abdul Hadi Asad

const express = require('express');
const app = express();

const PORT = 3000;
const HOST = 'localhost';

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Route: Home page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Express Server - Task 8</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                h1 { color: #2c3e50; }
                .badge { 
                    background: #3498db; 
                    color: white; 
                    padding: 5px 10px; 
                    border-radius: 4px; 
                    font-size: 12px;
                }
                a { color: #3498db; text-decoration: none; }
                a:hover { text-decoration: underline; }
                ul { line-height: 2; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Express.js Server <span class="badge">Task 8</span></h1>
                <p><strong>Server is running with Express!</strong></p>
                <p>Time: ${new Date().toLocaleString()}</p>
                
                <h3>Available Routes:</h3>
                <ul>
                    <li><a href="/">/ - Home (you are here)</a></li>
                    <li><a href="/about">/ about - About page</a></li>
                    <li><a href="/json">/json - JSON response</a></li>
                    <li><a href="/api/users">/api/users - User data (JSON)</a></li>
                    <li><a href="/api/status">/api/status - Server status (JSON)</a></li>
                    <li><a href="/notfound">/notfound - 404 example</a></li>
                </ul>                
            </div>
        </body>
        </html>
    `);
});

// Route: About page
app.get('/about', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>About - Express Server</title>
            <style>
                body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
                .container { background: white; padding: 30px; border-radius: 8px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>About This Server</h1>
                <p>This is an Express.js server created for Lab 10, Task 8.</p>
                <p>Express makes building web servers much easier than using the raw http module.</p>
                <p><a href="/">Back to Home</a></p>
            </div>
        </body>
        </html>
    `);
});

// Route: JSON response
app.get('/json', (req, res) => {
    res.json({
        message: 'This is a JSON response from Express',
        timestamp: new Date().toISOString(),
        framework: 'Express.js',
        version: '4.x',
        status: 'success'
    });
});

// Route: API - Users
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Unknown', role: 'Developer', active: true },
        { id: 2, name: 'IDK', role: 'Designer', active: true },
        { id: 3, name: 'UnderTaker', role: 'Manager', active: false }
    ];
    
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

// Route: API - Server status
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
});

// 404 Handler - Must be last
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>404 - Not Found</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin-top: 100px;
                    background-color: #f8f8f8;
                }
                .error { color: #e74c3c; font-size: 48px; margin: 20px; }
                code { background: #ecf0f1; padding: 5px 10px; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class="error">404</div>
            <h2>Page Not Found</h2>
            <p>The path <code>${req.url}</code> does not exist on this server.</p>
            <p><a href="/">Go back to Home</a></p>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, HOST, () => {
    console.log('=== TASK 8: Express Server ===');
    console.log(`Server running at http://${HOST}:${PORT}/`);
    console.log('Press Ctrl+C to stop the server\n');
});


