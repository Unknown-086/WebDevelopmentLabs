// Task 7 - Build a Basic HTTP Server
// Name: Abdul Hadi Asad

const http = require('http');
const url = require('url');

// Server configuration
const PORT = 3000;
const HOST = 'localhost';

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    console.log(`Request received: ${req.method} ${pathname}`);
    
    // Handle root path (/)
    if (pathname === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Task 7 - HTTP Server</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        max-width: 800px;
                        margin: 50px auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    h1 { color: #333; }
                    .info { 
                        background: white; 
                        padding: 20px; 
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    a { color: #0066cc; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <div class="info">
                    <h1>Welcome to Task 7 HTTP Server!</h1>
                    <p><strong>Server is running successfully!</strong></p>
                    <p>Current time: ${new Date().toLocaleString()}</p>
                    <h3>Try these routes:</h3>
                    <ul>
                        <li><a href="/">/(Home - you are here)</a></li>
                        <li><a href="/about">/about</a></li>
                        <li><a href="/json">/json (returns JSON)</a></li>
                        <li><a href="/api/users">/api/users (returns JSON data)</a></li>
                        <li><a href="/anything-else">/anything-else (404 example)</a></li>
                    </ul>
                </div>
            </body>
            </html>
        `);
    }
    // Handle /json route - demonstrates JSON response
    else if (pathname === '/json') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const jsonData = {
            message: 'This is a JSON response',
            timestamp: new Date().toISOString(),
            server: 'Node.js HTTP Server',
            status: 'success'
        };
        res.end(JSON.stringify(jsonData, null, 2));
    }
    // Handle /api/users route - more JSON example
    else if (pathname === '/api/users') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        const users = [
            { id: 1, name: 'Unknwon', role: 'Developer' },
            { id: 2, name: 'IDK', role: 'Designer' },
            { id: 3, name: 'UnderTaker', role: 'Manager' }
        ];
        res.end(JSON.stringify({ users, count: users.length }, null, 2));
    }
    // Handle /about route
    else if (pathname === '/about') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>About - Task 7</title>
            </head>
            <body style="font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px;">
                <h1>About This Server</h1>
                <p>This is a basic HTTP server built with Node.js for Lab 10, Task 7.</p>
                <p><a href="/">Back to Home</a></p>
            </body>
            </html>
        `);
    }
    // Handle all other paths - 404 Not Found
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`
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
                    .error { 
                        color: #d32f2f; 
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <h1 class="error">404 - Page Not Found</h1>
                <p>The path <code>${pathname}</code> does not exist on this server.</p>
                <p><a href="/">Go back to Home</a></p>
            </body>
            </html>
        `);
    }
});

// Start the server
server.listen(PORT, HOST, () => {
    console.log(`=== TASK 7: HTTP Server ===`);
    console.log(`Server running at http://${HOST}:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server\n`);


});