// HTTP module in node.js to handle client request and respond

// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log("req received!");
//   res.end("Hello Nodejs");
// });

// server.listen(8000, () => {
//   console.log("Server running on http://localhost:8000...");
// });

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const dataAndTime = new Date();
    const log = `${dataAndTime.toLocaleDateString()} ${dataAndTime.toLocaleTimeString()} get request found ${
      req.url
    } \n`;

    fs.appendFile("log.txt", log, (error) => {
      if (error) {
        req.statusCode = 500;
        res.end("server Error");
      }
      const filePath = __filename;

      if (path.basename(filePath) === "script.js") {
        const actualPath = filePath.replace("script.js", "index.html");

        fs.readFile(actualPath, "utf8", (err, data) => {
          if (err) {
            console.error("Error reading HTML file", err);
            res.statusCode = 500;
            res.setHeader("content-Type", "text/plain");
            res.end("Internal Server Issue!");
            return;
          } else {
            // send html file as response.
            res.statusCode = 200;
            res.setHeader("content-Type", "text/html");
            req.url = "/about";
            res.end(data);
          }
        });
      }
    });
  } else if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log("Received POST data: ", body);

      res.statusCode = 200;
      res.setHeader("content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Data Saved Successfully",
          status: `${res.statusCode}`,
          data: body,
        })
      );
    });
  } else {
    res.statusCode = 405; // Method Not Allowed
    res.end("Method not allowed");
    console.log(req.method);
    console.log(req.statusCode);
  }
});

server.listen(3000, () => {
  console.log("Server started!");
});
