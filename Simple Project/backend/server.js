// import express
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// middleware to parse JSON data.
app.use(cors());
app.use(express.json());

// create a simple API.
const items = [
    { id: 1, data: "item 1" },
    { id: 2, data: "item 2" }
];

// GET route for fetch item.
app.get("/api/items", (req, res) => {
    res.json(items);
});

// POST route for fetch item.
app.post("/api/items", (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(200).json(newItem);
});

// PUT route for fetch item.
app.put("/api/items/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find((i) => i.id === id);
    if (item) {
        item.name = req.body.name;
        res.json(item);
    } else {
        res.status(404).json({ message: "Item not found!" });
    }
});

// Create Listner to our server.
app.listen(PORT, () => {
    console.log("server is running on POST ", PORT);
})