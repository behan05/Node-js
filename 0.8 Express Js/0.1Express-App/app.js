"use strict";

const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

// adding middleware to parse incoming data into js Objects.
app.use(express.json());

const customAPI = [
    {
        id: 1,
        message: "Hello from Custom-API"
    },
    {
        id: 2,
        message: "Hello from Custom-API"
    }
]

function createLog(req) {
    const pathOfFile = path.join(__dirname, "log.txt");
    const dateTime = new Date()
    const logMessage = `Getting request from ${req.method}, ${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}\n`;

    fs.appendFile(pathOfFile, logMessage, (error) => {
        if (error) {
            console.error("Log is not created: " + error.message);
        }
        console.log("log created Successfully!");
    })
}

app.get("/api/items", (req, res) => {
    // calling createLog to create Log.
    createLog(req);
    res.header("content-Type", "application/json");
    res.json(customAPI);
})

app.post("/api/items", (req, res) => {
    // calling createLog to create Log.
    createLog(req);

    const id = req.body.id;
    const message = req.body.message;

    if (id && message) {
        customAPI.push({ id: id, message: message });
        res.status(200).json({ id, message });
    } else {
        res.status(404).json({ error: "ID and Message are not required!" })
    }
})

const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server is Running on " + PORT);
})