const http = require("http");
const path = require("path");
const fs = require("fs");

function createFolder() {
  const folderPath = `${__dirname}`;
  fs.mkdir(
    path.join(folderPath, "Programatically"),
    { recursive: true },
    (error) => {
      if (error) {
        console.log("Directory is not created! ", error);
        return;
      }
      fs.open(`${__dirname}\\Programatically\\log.txt`, "w", (err) => {
        if (err) {
          console.log("file can be exist!");
          return;
        }
        console.log("file is created!");
        return;
      });
    }
  );
}

createFolder();

function logTime() {
  const currentDate = new Date();
  return `${currentDate.toLocaleTimeString()} ${currentDate.toLocaleDateString()}`;
}
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const logMessage = `${logTime()} - Received ${req.method} request from ${
      req.url
    }`;
    const logFilePath = path.join(__dirname, "Programatically", "log.txt");

    fs.appendFile(logFilePath, `${logMessage} \n`, (err) => {
      if (err) {
        console.error(new Error("Error Writing to a log file: ", err));
      } else {
        // Header Help to browser to parase accordingly.
        res.setHeader("content-Type", "text/plain");
        res.statusCode = 200;
        res.end("Hello From Server!");
      }
    });
  }
});

server.listen(3000, () => {
  console.log("server is running");
});
