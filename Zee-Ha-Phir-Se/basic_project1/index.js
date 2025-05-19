
const express = require('express');
const app = express();
const PORT = 8000;
const mockData = require("./MOCK_DATA.json");
const fs = require('fs');

const data = mockData;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    fs.appendFile('log.txt', `/n${new Date()}, , ${req.ip}, ${req.url}, ${req.path}`, (err, data) => {
        if (err) {
            console.error(err.message);
        } else {
            next();
        }
    });


})


app.get('/api/users', (req, res) => {
    res.json(data)
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    res.json(data.find((user) => user.id === id));
});

app.post('/api/users', (req, res) => {
    const id = data.length + 1;
    const { first_name, last_name, email, gender, job_title } = req.body;

    if (first_name && last_name && email && gender && job_title) {
        data.push({
            id,
            first_name,
            last_name,
            email,
            gender,
            job_title
        })
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), 'utf-8', (err) => console.log(err));
        res.status(200).json({ message: "User added successfully", id })
    } else {
        res.status(400).json({ error: "All fields are required" });
    }
})

app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const { first_name, last_name, email, gender, job_title } = req.body;

    const user = data.find((user) => user.id === id);

    if (!user) {
        res.status(404).json({ error: "User not found" });

    } else {
        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (email) user.email = email;
        if (gender) user.gender = gender;
        if (job_title) user.job_title = job_title;

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(data, null, 2), (err) => console.log(err.message));

        return res.status(200).json({
            message: "User updated successfully",
            user
        });
    }
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const users = data.filter((user) => user.id !== id);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) =>
        console.log(err.message));

    res.status(200).json({ message: 'user deleted successfully' });

})

app.listen(PORT, console.log('server started'));