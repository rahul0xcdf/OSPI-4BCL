const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Database name
const dbName = 'userDatabase';

app.post('/save', async (req, res) => {
    const { username, password, ans1, ans2, ans3, phone_no, SQ1, SQ2, SQ3, email_id } = req.body;

    const userDetails = {
        username,
        password,
        ans1,
        ans2,
        ans3,
        phone_no,
        SQ1,
        SQ2,
        SQ3,
        email_id
    };

    try {
        await client.connect();
        console.log('Connected to database');
        const db = client.db(dbName);
        const collection = db.collection('userDetails');
        await collection.insertOne(userDetails);
        res.status(200).send('Data saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to save data');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
