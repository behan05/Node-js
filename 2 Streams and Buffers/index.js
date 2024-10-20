// Reading and writing files using streams.
// Buffers to handle binary data.


// --> Reading and writing files using streams. 
const fs = require("fs");
const path = require("path");

// const stream = fs.createReadStream(path.join(__dirname, "text.txt"), "utf-8");
// const writestream = fs.createWriteStream(path.join(__dirname, "create.txt"), "utf-8");

// stream.pipe(writestream);

// writestream.on("finish", () => {
//     console.log("File has been written successfully.");
// })

// responseData.on("data", (chunk) => {
//     console.log(chunk);
// }).on("end", () => {
//     console.log("All data readed!");
// }).on("error", (err) => {
//     console.log(err.message);
// }).on("close", () => {
//     console.log("closed reading file!");
// })

fs.createReadStream(path.join(__dirname, "text.txt"), "utf-8")
    .pipe(fs.createWriteStream(path.join(__dirname, "create.txt"), "utf-8"))
    .on("finish", () => {
        console.log("all data created successfully!");
    })
