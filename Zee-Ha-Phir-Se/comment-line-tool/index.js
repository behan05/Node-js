/*
- **Features**:
  - Create a simple command-line tool to add, delete, and list notes.
  - Store notes in a text file using the `fs` module.
  - Use `http` to create a server and display notes in the browser.
*/

const fs = require("fs");
const path = require("path");

const noteFile = path.join(__dirname, "note.txt");

function addNote(note) {
    fs.appendFile(noteFile, note + "\n", (error) => {
        if (error) console.log("getting error during add a new task : ", error);

        console.log(`added a new task ${note}`);
    })
}
function deleteNote() {
    fs.writeFile(noteFile, "", (error) => {
        if (error) console.log("getting error during add a new task : ", error);

        console.log("Delete successfully");
    });
}
function listNote() {
    const readStream = fs.createReadStream(noteFile, "utf-8");

    readStream.on('data', (chunk) => {
        console.log(chunk);
    }).on('error', (err) => {
        console.log('getting error during list : ', err);
    }).on("finish", () => {
        console.log("Alll data listed successfully!");
    })
}


const command = process.argv[2];
const note = process.argv[3];

if (command == "list") {
    listNote();
} else if (command == "add" && note) {
    addNote(note);
} else if (command == "delete") {
    deleteNote();
}


