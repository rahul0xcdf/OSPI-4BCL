const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const url = 'mongodb://localhost:27017/';
const databasename = 'users';

let db, collection;

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(databasename);
    collection = db.collection('userDetails');
    console.log('Connected to database');
    
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// Find user function
const findUser = async (username, password) => {
  const query = { username, password };
  try {
    const user = await collection.findOne(query);
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};

// Save user route
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
    console.log('Attempting to insert:', userDetails); // Add this log
    const result = await collection.insertOne(userDetails);
    console.log('Insert result:', result); // Add this log
    res.status(200).send('Data saved successfully');
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Failed to save data');
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUser(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }

    const { SQ1, SQ2, SQ3, ans1, ans2, ans3, phone_no } = user;

    res.status(200).json({
      message: 'Logged in successfully!',
      SQ1,
      SQ2,
      SQ3,
      ans1,
      ans2,
      ans3,
      phone_no,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/getSecurityQuestions', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUser(username, password);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const { SQ1, SQ2, SQ3, ans1, ans2, ans3 } = user;

    res.status(200).json({ SQ1, SQ2, SQ3, ans1, ans2, ans3 });
  } catch (error) {
    console.error('Error fetching security questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
