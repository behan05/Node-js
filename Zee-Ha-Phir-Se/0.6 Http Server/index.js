// http is a core nodejs built-in module used to create a web-server.

const http = require("http");
const fs = require("fs");
const path = require("path");

// const server = http.createServer((req, res) => {
//     // console.log(req);
//     res.end(`<h1>Hello from server again!</h1>`);
// })

// server.listen(8000, () => console.log("server is running"));


// const server = http.createServer((req, res) => {

//     if (req.method === "GET") {
//         console.log(`Getting request :: ${req.method}`);

//         res.end("<h1>Hey there, you are requesting to server!</h1>");
//     }
// })

// server.listen(8000, () => {
//     console.log("server started at PORT :: 8000");
// });


// understand some important propos of req object.

// const server = http.createServer((req, res) => {

//     // if (req.method === "GET") {
//     //     res.statusCode = "200";
//     //     res.end("Hello");
//     // }

//     // if (req.url === "/") {
//     //     res.statusCode = "200";
//     //     res.end(JSON.stringify(req.headers.host));
//     // }

// })
// server.listen(3000);


// function storeLog() {
//     const server = http.createServer((req, res) => {
//         const logDir = path.join(__dirname, "logs");
//         const logFile = path.join(logDir, "log.txt");

//         // Create 'logs' directory if it doesn't exist
//         fs.mkdir(logDir, { recursive: true }, (err) => {
//             if (err) {
//                 console.error("Error creating folder:", err);
//                 res.writeHead(500, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ error: "Internal Server Error" }));
//                 return;
//             }

//             // Append log entry
//             const logEntry = `${new Date().toISOString()} || ${req.method} || ${req.url}\n`;
//             fs.appendFile(logFile, logEntry, (err) => {
//                 if (err) {
//                     console.error("Error writing to log file:", err);
//                     res.writeHead(500, { "Content-Type": "application/json" });
//                     res.end(JSON.stringify({ error: "Internal Server Error" }));
//                     return;
//                 }

//                 // Send a proper response
//                 res.writeHead(200, { "Content-Type": "application/json" });
//                 res.end(JSON.stringify({ message: "Log stored successfully" }));
//             });
//         });
//     });

//     server.listen(3000, () => {
//         console.log("Server started at PORT: 3000");
//     });
// }

// storeLog();


const server = http.createServer((req, res) => {

    const data = {
        name: "behan",
        message: "response successfully done!",
        statusCode: 200
    }

    if (req.url === "/") {
        res.writeHead(200, { 'content-type': "text/plain" });
        res.end("welcome to home page");

    } else if (req.url === '/about') {
        res.writeHead(200, { "content-Type": "application/json" });
        res.end(JSON.stringify(data));

    } else if (req.url === "/form") {
        res.writeHead(200, { 'content-Type': 'text/html' })
        res.end(`<input type=text placeholder='enter name' />`)

    } else if (req.url === "/dataSend") {
        let body = "";

        // collecting data from req body.
        req.on("data", (chunk) => {
            body += chunk.toString()
        })

        req.on("end", () => {
            try {
                const parsedData = JSON.parse(body); // convert to js object.
                console.log('Parsed Data:', parsedData);

                res.writeHead(200, { "content-Type": "application/json" });

                res.end(JSON.stringify({ message: "Data Received", content: parsedData }))

            } catch (error) {

            }

        })

    } else {
        res.writeHead(404, { "content-Type": 'application/json' });
        res.end(JSON.stringify(
            {
                message: "Page not found!"
            }
        ));
    }
})

// server.listen(3000, () => {
//     console.log("server started at PORT :: 3000");
// });


const newServer = http.createServer((req, res) => {
    console.log(req.socket.remoteAddress);
    console.log(req.socket.remotePort);
    res.end("Helloooooooooo")
})

// newServer.listen(3000)

