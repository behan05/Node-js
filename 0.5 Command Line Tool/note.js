/*
- **Features**:
  - Create a simple command-line tool to add, delete, and list notes.
  - Store notes in a text file using the `fs` module.
  - Use `http` to create a server and display notes in the browser.
*/

const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "list.txt");

// Function to list notes
function listNote() {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw err;
    console.log("Notes: ");
    console.log(data || "No notes found");
  });
}

// Function to add notes
function addNote(note) {
  fs.appendFile(filePath, note + "\n", (error) => {
    if (error) throw error;
    console.log("note added: " + note);
  });
}

// Function to delete notes
function deleteNote() {
  fs.writeFile(filePath, "", (err) => {
    if (err) throw err;
    console.log("All notes deleted!");
  });
}

// Command line arguments.

const command = process.argv[2];
const note = process.argv[3];

if (command === "list") {
  listNote();
} else if (command === "add" && note) {
  addNote(note);
} else if (command === "delete") {
  deleteNote();
} else {
  console.error('Unknown command. Use "list", "add <note>", or "delete".');
}
