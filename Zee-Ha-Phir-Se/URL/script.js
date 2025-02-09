
const http = require("http");
const url = require("url");


const server = http.createServer((req, res) => {

    // extract URL
    const params = url.parse(req.url) // return an object.
    console.log(params);

    if (params.pathname === "/") {
        res.end("Welcome to home page!");

    } else if (params.pathname === "/about") {
        res.end("Welcome to about page!");

    } else {
        res.end("404 page not found!");
    }
})

// server.listen(3000, console.log("server started at PORT :: 3000"));
