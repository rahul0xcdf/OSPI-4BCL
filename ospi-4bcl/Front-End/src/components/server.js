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

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    const connect = client.db(databasename);
    const collection = connect.collection('userDetails');

    
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
        // Fetch user details including security questions
        const user = await findUser(username, password);

        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }

        const { SQ1, SQ2, SQ3, ans1, ans2, ans3 } = user;

        // Return security questions in the response
        res.status(200).json({ SQ1, SQ2, SQ3, ans1, ans2, ans3 });
      } catch (error) {
        console.error('Error fetching security questions:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });


  /*

  const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const port = 3000; 

app.use(bodyParser.json());
app.use(cors()); 

const url = 'mongodb://localhost:27017/';
const databasename = 'users'; 

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    const connect = client.db(databasename);
    const collection = connect.collection('userDetails');

    const findUser = async (username, password) => {
      const query = { username, password };

      try {
        const user = await collection.findOne(query);
        return user ? true : false;
      } catch (error) {
        console.error(error);
        return false;
      }
    };

    // API route for user login
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      const isAuthenticated = await findUser(username, password);

      if (isAuthenticated) {
        res.status(200).json({ message: 'Logged in successfully!' });
        console.log('Logged in successfully!')
      } else {
        res.status(401).json({ message: 'Wrong username or password' });
        console.log('Wrong username or password')
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });

  */