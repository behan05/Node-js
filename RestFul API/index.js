const users = require("./MOCK_DATA.json");
const express = require("express");

const app = express();
const PORT = 3000;

// Custom Middleware to convert object into JSON.
// app.use(express.json());

app.use((req, res, next) => {
    if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        }).on("end", () => {
            try {
                // try to parse data as JSON;
                req.body = JSON.parse(data);
                next();

            } catch (error) {
                // if parse failed! statusCode --> 400 for Bad Request.
                return res.status(400).json({ error: "Invalid JSON" })
            }
        })
    } else {
        next();
    }
});

app.get("/api/users/:id?", (req, res) => {
    const id = req.params.id;

    if (id) {
        const user = users.find((user) => user.id === parseInt(id));
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ error: "user not found" })
        }
    } else {
        return res.status(200).json(users);
    }
})

// Create new user.
app.post("/api/users", (req, res) => {
    const { id, first_name, last_name, email, gender, job_title } = req.body;
    const data = {
        id: id,
        firstName: first_name,
        lastName: last_name,
        email: email,
        gender: gender,
        jobTitle: job_title
    }
    users.push(data);
    res.status(200).json({ message: "New User Created!", user: data })
})

// Edit an existing user.
app.patch("/api/users/:id?", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);
    if (user) {
        // Update only the provided fields.
        const { first_name, last_name, email, gender, job_title } = req.body;
        if (first_name) users.last_name = first_name;
        if (last_name) users.last_name = last_name;
        if (email) users.email = email;
        if (gender) users.gender = gender;
        if (job_title) users.job_title = job_title;

        return res.status(200).json({ message: "User updated successfully!", user: user });
    } else {
        return res.status(404).json({ error: "User not found" });
    }
})

// Delete existing user.
app.delete("/api/users/:id?", (req, res) => {
    const id = parseInt(req.params.id);
    if (id) {
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex !== -1) {
            const deleteUser = users.splice(userIndex, 1);
            return res.status(200).json({ message: "User Deleted!", deletedUser: deleteUser });
        } else {
            return res.status(404).json({ error: "user not found" })
        }
    } else {
        return res.status(400).json({ error: "Invalid ID" });
    }
})

app.listen(PORT, () => console.log(`server started at port: ${PORT}`)
)