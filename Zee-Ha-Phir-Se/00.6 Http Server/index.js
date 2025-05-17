// http is a built-in module that can be used to create server. It can handle all http requests.

const http = require("http");
const fs = require('fs');
const path = require('path');

// const server = http.createServer((req, res) => {
//     // console.log('Req Accepted! ');
//     // res.end(`<h1>Hello from server!</h1>`);
//     // // console.log(req);
//     // console.log(res);

//     const urls = req.url
//     switch (urls) {
//         case '/':
//             res.end(`<h1>Welcome to Home Page!</h1>`);
//             break;
//         case '/about':
//             res.end(`<h1>Welcome to About Page!</h1>`);
//             break;
//         case '/contact':
//             res.end(`<h1>How may i help you!</h1>`);
//             break;
//         case '/blog':
//             res.end(`<h1>Welcome to Our Blog Page!</h1>`);
//             break;
//         default:
//             res.end('404 Page Not Found!')
//             break;
//     }
// });

const server = http.createServer((req, res) => {

    const data = {
        name: "behan",
        message: "response successfully done!",
        statusCode: 200
    }

    function dt() {
        return {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
        }
    };

    let logData = {
        ip: req.socket.remoteAddress,
        data: dt().date,
        time: dt().time,
        url: req.url,
        method: req.method,
        statusCode: 200,
    }

    if (req.url === '/favicon.ico') return;

    const logDir = path.join(__dirname, 'logs');
    const logFile = path.join(logDir, 'log.txt');

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    fs.appendFile(logFile, JSON.stringify(logData) + '\n', (err) => {
        if (err) {
            console.error(err);
        };
    });

    if (req.url == "/logs") {
        res.setHeader = { 'content-Type': 'text/plain' };
        res.statusCode = 200;
        const dataStream = fs.createReadStream(logFile, 'utf-8');

        dataStream.pipe(res); // automatically handle write + end event.
        dataStream.on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Error reading log file: ${err.message}`);
        })
    } else {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(data));
    }

})


server.listen(8000, () => console.log('Server Started at PORT : 8000'));