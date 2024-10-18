const users = require("./MOCK_DATA.json");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// this middleware add upcoming form data in into body.
app.use(express.urlencoded({ extended: true }));
// Custom Middleware to convert object into JSON.
app.use(express.json());
app.use((req, res, next) => {
    const dt = new Date();
    const logData = `1 --> ${dt.toLocaleDateString() + " : " + dt.toLocaleTimeString()}: ${req.method}: ${req.url}: ${req.ip} \n`
    fs.appendFile(path.join(__dirname, "log.txt"), logData, (err) => {
        if (err) {
            console.log("Failed to created Log data!");
        }
    })
    next();
});

// app.use((req, res, next) => {
//     if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
//         let data = "";

//         req.on("data", (chunk) => {
//             data += chunk;
//         }).on("end", () => {
//             try {
//                 // try to parse data as JSON;
//                 if (req.headers['content-type'] === "application/json") {
//                     req.body = JSON.parse(data);
//                 }
//                 next();

//             } catch (error) {
//                 // if parse failed! statusCode --> 400 for Bad Request.
//                 return res.status(400).json({ error: "Invalid JSON" })
//             }
//         })
//     } else {
//         next();
//     }
// });

// Dynamic Route.
app
    .route("/api/users/:id?")

    .get((req, res) => {
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
    // Edit an existing user.
    .patch((req, res) => {
        const id = parseInt(req.params.id);

        const user = users.find(user => user.id === id);
        if (user) {
            // Update only the provided fields.
            const { first_name, last_name, email, gender, job_title } = req.body;
            if (first_name) user.last_name = first_name;
            if (last_name) user.last_name = last_name;
            if (email) user.email = email;
            if (gender) user.gender = gender;
            if (job_title) user.job_title = job_title;

            return res.status(200).json({ message: "User updated successfully!", user: user });
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    })

    // Delete existing user.
    .delete((req, res) => {
        const id = parseInt(req.params.id);
        if (id) {
            const userIndex = users.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                const [deletedUser] = users.splice(userIndex, 1);
                return res.status(200).json({ message: "User Deleted!", deletedUser: deletedUser });
            } else {
                return res.status(404).json({ error: "user not found" })
            }
        } else {
            return res.status(400).json({ error: "Invalid ID" });
        }
    })

// Create new user.
app.post("/api/users", (req, res) => {
    // console.log(req.body);

    // const { id, first_name, last_name, email, gender, job_title } = req.body;
    // const data = {
    //     id: parseInt(id),
    //     first_name,
    //     last_name,
    //     email,
    //     gender,
    //     job_title
    // }
    const newUser = req.body;

    // spread Object.and join new ID.
    users.push({ ...newUser, id: users.length + 1 });

    // Write the updated users array back to the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving user to file", error: err });
        }
        else {
            return res.status(200).json({ message: "New User Created!", user: newUser.first_name, id:newUser.id })
        }
    });
})


app.listen(PORT, () => console.log(`server started at port: ${PORT}`));



