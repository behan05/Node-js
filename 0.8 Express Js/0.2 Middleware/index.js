/* 
there are main 6 types of middleware available in express.
1 --> Application-Level Middleware.
2 --> Route-Level Middleware.
3 --> Built-in Middleware.
4 --> Third-Party Middleware.
5 --> Error-Handling Middleware(it parameter, thats it).
6 --> Custom Middleware (middleware you write to add custom functionality).
*/

const express = require("express");

// factory function because it return Object Directly.
const app = express();
const PORT = 3000;

// Application-level Middleware // also built-in middleware.
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); make data available in request body.
app.use(express.urlencoded({ extended: true }));

// Route-Level Middleware. also 
app.use((req, res, next) => {
    if (req.method === "GET" || req.method === "POST") {
        if (typeof req.body === "object" && req.body !== null) {
            console.log("request Body is parsed");
            next()
        } else {
            return res.status(500).json({ error: "Data not parsed, server Issue" });

        }

    } else {
        return res.status(404).json({ error: "Page Not Found!" })
    }
})


const users = [
    {
        id: 1,
        name: "Behan",
        age: 25
    },
    {
        id: 2,
        name: "Sitesh",
        age: 22
    }
]

// get route.
app.get("/users/:id?", (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
        const user = users.find(user => user.id === id);
        return res.status(200).json(user);
    } else {
        res.status(200).json(users);
    }
});

// post route.
app.post("/users", (req, res, next) => {
    const dataReceived = req.body;
    if (!dataReceived.name || !dataReceived.age || !dataReceived.id) {
        const error = new Error("All Field Required! to create new user.");
        error.status = 400;
        return next(error); // call to next middleware.
    } else {
        users.push({ dataReceived });
        res.status(200).json({ message: "New user created!" })
    }
});

// Error-Handling Middleware(it parameter, thats it). just like custom.

app.use((error, req, res, next) => {
    console.log(error); // log the error for debug.
    const statusCode = error.status ?? 500;
    res.status(statusCode).json({ error: error.message || "Internal Server Error" });
})


app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
})
