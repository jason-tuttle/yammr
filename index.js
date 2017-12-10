const http = require('http');
const fs = require('fs');
const wss = require('./websockets-server');
const extract = require('./extract');

const handleError = function(err, res) {
    res.writeHead(404);
    fs.readFile('./app/404.html', function(err, data) {
        res.end(data);
    });
}

const server = http.createServer(function (req, res) {
    console.log('Responding to a request');
    const filePath = extract(req.url);
    fs.readFile(filePath, function(err, data) {
        if (err) {
            handleError(err, res);
            return;
        } else {
            res.end(data);
        }
    });
});

server.listen(3000);
