
// TODO: Homework assignment. Make Logged open a file and save the event message.

const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const server = http.createServer((req, res) => {
    /* if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), 'utf-8')
            .then(page => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(page);
            });
    } else if (req.url === '/about') {
        fs.readFile(path.join(__dirname, 'public', 'about.html'), 'utf-8')
            .then(page => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(page);
            });
    } else if (req.url === '/api/users') {
        const users = [
            { name: 'Bob Smith', age: 40 },
            { name: 'John Doe', age: 30 },
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404</h1>');
    } */

    // Build file path
    const filePath = path.join(
        __dirname, 'public',
        req.url === '/' ? 'index.html' : req.url
    );

    // Set content type based on extension of file requested
    const extName = path.extname(filePath);
    let contentType = 'text/html';
    switch (extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath).then(data => {
        // Sucess
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    }).catch(error => {
        if (error.code === 'ENOENT') {
            // Page not found
            fs.readFile(path.join(__dirname, 'public', '404.html'))
                .then(page => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(page, 'utf-8');
                })
        } else { 
            // Some server error
            res.writeHead(500);
            res.end(`Server Error: ${error.code}`);
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`\nServer running on PORT ${PORT}\n`));
