const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/save', (req, res) => {
    const userDetails = req.body;
    const data = `
    Name: ${userDetails.name}
    Phone Number: ${userDetails.phone}
    Password: ${userDetails.password}
    Favorite Animal: ${userDetails.animal}
    `;
    fs.appendFile('userDetails.txt', data + '\n\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to save data');
        } else {
            res.status(200).send('Data saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
