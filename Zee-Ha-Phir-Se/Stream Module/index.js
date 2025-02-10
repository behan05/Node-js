
const path = require("path");
const fs = require("fs");
const zip = require("node:zlib");

/*
     --> type of stream
         in nodeJs there are four main types:

         1 -> Readable Stream
         2 -> writable stream
         3 -> Duplex stream
         4 -> transform stream
*/

// (fs.readFile() --> taking extra memory) / fs.createReadStream() --> return in chunk (small quantity)


// fs.readFile("./text.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.error("getting error during read file :: ", err);
//     } else {
//         console.log("received data :: ", data);
//     }
// })

// const dataStream = fs.createReadStream("./text.txt", "utf-8")

// dataStream.on("data", (chunk) => {
//     console.log("received data :: ", chunk);
// });

// dataStream.on("end", () => {
//     console.log("All Data Received!");
// });

// dataStream.on("error", (err) => {
//     console.error("getting error during reading data :: ", err)
// })



function writeData() {
    const dataStream = fs.createReadStream("./text.txt", "utf-8")

    const currentFilePath = path.join(__dirname, "text2.txt");

    dataStream.pipe(fs.createWriteStream(currentFilePath, { encoding: "utf-8" }));

    dataStream.on("end", () => console.log("all data received!"));

    dataStream.on("error", (err) => console.error(err));

}

// writeData();

function writeDataInZip() {

    const dataStream = fs.createReadStream("./text.txt", "utf-8")

    const currentFilePath = path.join(__dirname, "text");

    const zipStream = zip.createGzip();

    // Correctly chain streams
    dataStream
        .pipe(zipStream) //  Compress first
        .pipe(fs.createWriteStream(currentFilePath + ".gz", { encoding: "utf-8" })) //  Then write compressed data.

        .on("finish", () => console.log("data Written successfully!"));

    dataStream.on("end", () => console.log("all data received!"));
    dataStream.on("error", (err) => console.error(err));

    dataStream.on("data", (chunk) => console.log("📜reading chunk", chunk.length));
    zipStream.on("data", (chunk) => console.log("🗜 Compressing  chunk", chunk.length));
}

writeDataInZip()