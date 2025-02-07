
// this module help to work with directory or folder.

const path = require("path");
const fs = require("fs");
// console.log(path);

// return directory.
// const currentPath = path.dirname(__dirname)

let url = "/s/ss//dec";
// const currentPath = path.join(__dirname)
// console.log(currentPath);


function createFolder() {
    const currentPath = __dirname;

    fs.mkdir(path.join(currentPath, "programatically"), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Folder Created!");
            fs.open(path.join(__dirname, "programatically", "log.txt"), "w" , (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("file creared!");
                }
            })
        }
    })
}

createFolder();
