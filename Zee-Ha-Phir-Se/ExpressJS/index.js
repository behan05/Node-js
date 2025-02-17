// Express JS -> npm package -> framework
/*
expressJS is a web framework that are used to build a web server and it handle Http request and respond. and also build a robust API. and it provide various built in mehtod or props.
*/

const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());

// function createLogs() {
//     const logPath = path.join(__dirname, "log.txt");

//     fs.appendFile()
// }

// createLogs();

const profile = [
    {
        id: 1,
        name: "behan",
        age: 25
    }
]

app.get("/", (req, res) => {
    res.writeHead(200, { "content-type": "application/json", "makeBy": "behan" });
    res.end(
        JSON.stringify(profile)
    );
});

app.get("/profile/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    const user = profile.find(user => user.id === userId);

    if (!userId) {
        return res.json(
            {
                error: "user not found!"
            }
        )
    }
    res
        .setHeader('content-Type', "application/json")
        .status(200)
        .json(user); // automatically set header as application/json
})

app.post("/profile/:id", (req, res) => {
    const userId = Number(req.params.id);
    if (userId) {
        const { name, age } = req.body;

        if (name && age) {
            profile.push({
                id: userId,
                name,
                age
            });
        }
    }

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({
        id: req.params.id,
        message: `Hey ${req.body.name} you have successfully post data`
    }));
})

// to update existing data.
app.put("/profile/:id", (req, res) => {
    const userId = Number(req.params.id);
    const user = profile.find(user => user.id === userId); // finding a single user.

    if (!user) {
        return res
            .status(404)
            .json({ error: "user not found!" })
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.age) user.age = req.body.age;

    // Send success response after updating
    res.status(200).json({ message: "User updated successfully", user });
})
app.listen(3000);
