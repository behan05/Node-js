// going to learn about Stream module in Node.
// "use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const zip = require("node:zlib");
const { gzipSync } = require("zlib");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    // Getting file location to read.
    const filePath = path.join(__dirname, "text.txt.gz");

    // condition to check file available or not.

    if (path.basename(filePath) === "text.txt.gz") {
      res.writeHead(200, { "content-Type": "text/plain" });

      // Read Zip File.

      // stream file content to browser.
      const stream = fs.createReadStream(filePath, "utf-8");
      stream.on("data", (chunk) => {
        res.write(chunk);
      });
      stream.on("error", (err) => {
        res.end("There is some server Issue " + err.message);
      });
      stream.on("end", () => {
        res.end();
      });

      // Zip the file into a new .gz file after response is finished.
      stream.on("close", () => {
        const gzipStream = fs
          .createReadStream(filePath)
          .pipe(zip.createGzip())
          .pipe(fs.createWriteStream(filePath + ".gz"));
        gzipStream.on("finish", () => {
          console.log("File is Zipped Successfully!");
        });
      });
    }
  }

  const filePath = path.join(__dirname, "text.txt.gz");
  const unzipStream = fs
    .createReadStream(filePath)
    .pipe(zip.createGunzip())
    .pipe(res);
  unzipStream.on("error", () => {
    console.error("Error while reading or unzipping the file: ", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error: Unable to read or unzip the file.");
  });
  unzipStream.on("end", () => {
    res.end(); // Ensure the response ends when the stream ends
  });
});

server.listen(3000, () => {
  console.log("server is running!");
});
