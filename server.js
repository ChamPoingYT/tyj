const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const dataFilePath = path.join(__dirname, 'data.json');

// Read data from JSON file
const readData = () => {
    return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
};

// Write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

app.get('/api/articles', (req, res) => {
    const data = readData();
    res.json(data.articles);
});

app.post('/api/articles', (req, res) => {
    const data = readData();
    const newArticle = req.body;
    data.articles.push(newArticle);
    writeData(data);
    res.status(201).json(newArticle);
});

app.get('/api/topics', (req, res) => {
    const data = readData();
    res.json(data.topics);
});

app.post('/api/topics', (req, res) => {
    const data = readData();
    const newTopic = req.body;
    data.topics.push(newTopic);
    writeData(data);
    res.status(201).json(newTopic);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
