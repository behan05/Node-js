// there are two type of method we have async(non-blocking operation) take(callback) / sync (blocking operation) and not return promise. if import fs/promises then it always return promise.

import fs from "fs";

// write in a file.
// async method take callback once file write then FN execute.

// fs.writeFile("example.txt", "i am a good boy i hope you never mind!", (err) => {
//     if (err) {
//         console.error("not write file", err);
//     } else {
//         console.log("file write Successfully!");
//     }
// })

// console.log(1);

// try {
//     fs.writeFileSync("example.txt", "hey i am admin!", "utf-8")
//     console.log("data written");
// } catch (error) {
//     console.error(error);
// }

// console.log(2);

// const promise = fs.promises.readFile("./example.txt", "utf-8");
// promise.then(
//     (data) => {
//         console.log(`readed data: ${data}`);
//     }
// )
// // error handling.
// promise.catch(
//     (error) => {
//         console.error("getting error :: ", error);
//     }
// )

// console.log("run first");

// fs.promises.appendFile("./example.txt", "\ni am appending another text.")
//     .catch(err => console.log(err));

// fs.appendFile("./example.txt", "\ni am appending another text.", (err) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log("appended text");
//     }
// });


// fs.promises.rename("./renameExample.txt", "renameExampleAgain.txt")
//     .then(() => {
//         console.log("file renamed!");
//     })
//     .catch(err => {
//         console.log("getting error during rename :: ", err);
//     })

// fs.stat("./package.json", (err, stats) => {
//     if (err) {
//         console.log("getting error during stats access :: ", err);
//     }
//     else {
//         console.log(stats);
//     }
// })

fs.promises.unlink("./renameExampleAgain.txt")
    .then(() => {
        console.log("file daleted successfully!");
    })
    .catch(err => {
        console.error(err);
    })