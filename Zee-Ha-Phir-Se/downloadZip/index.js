const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        res.setHeader("content-Type", "application/gzip");
        res.setHeader("content-Disposition", "attachment");

        res.end(JSON.stringify({
            your_Request_Method: req.method,
            message: "Thanks for your request!",
            statusCode: 200
        }));
    }
});

const PORT = 3000;
server.listen(PORT, console.log("server started at PORT:: ", PORT));