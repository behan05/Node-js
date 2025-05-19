const express = require('express');
const app = express();

const PORT = 8000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.end(`Welcome to Home Page!`);
});

app.get('/about/:id', (req, res) => {
    res.end(`Welcome to About Page  ${req.params.id} ${req.query.name || ''}`);
});

app.post('/form', (req, res) => {
    const { name } = req.body;
    if (name) {
        res.setHeader('Content-Type', 'text/html');
        res.send(`<h1>Hello ${name}<h1/>`)
    }else {
        res.status(400).send('Name is required');
    }
})

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));