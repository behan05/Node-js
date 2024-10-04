// Understand URL module.

const url = require("url");
const http = require("http");
const fs = require("fs");

function createLogDateTime() {
  const dateObj = new Date();
  return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
}
const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile(
    "log.txt",
    `Received request at ${createLogDateTime()} from ${req.url}. \n`,
    (error) => {
      try {
        if (error) {
          throw new Error(
            "There is somthing intruption during data append!".toUpperCase(),
            error
          );
        } else {
          switch (myUrl.pathname) {
            case "/":
              res.statusCode = 200;
              res.end("HOMEPAGE");
              break;
            case "/about":
              res.statusCode = 200;
              res.setHeader("content-Type", "text/html");
              const userName = myUrl.query.name;
              res.write(`<h1>Welcome to the About Page ${userName} </h1>`);
              res.end();
              break;
            case "/contact-us":
              res.statusCode = 200;
              res.end("Welcome to Contact us");
              break;
            default:
              res.end("404 Page not found!");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  );
});
server.listen("8080", () => {
  console.log("Server Startes!");
});
