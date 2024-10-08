const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");

const jwt = require('jsonwebtoken');


const jwksClient = require('jwks-rsa');




const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://127.0.0.1:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());


const url = 'mongodb://127.0.0.1:27017/';
const databasename = 'users';

let db, collection;



MongoClient.connect(url)
  .then((client) => {
    db = client.db(databasename);
    collection = db.collection('userDetails');
    console.log('Connected to database');
    
    app.listen(port, '127.0.0.1', () => {
      console.log(`Server is running on http://127.0.0.1:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });


  
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


const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
      const decodedToken = jwt.decode(token, { complete: true });
      const kid = decodedToken.header.kid;
      const clientId = decodedToken.payload.client_id;

      if (clientId !== VALID_CLIENT_ID) {
          return res.sendStatus(401);
      }

      const client = jwksClient({
          jwksUri: 'https://auth.onzauth.com/.well-known/jwks.json',
          requestHeaders: {}, // Optional
          timeout: 30000 // Defaults to 30s
      });

      const key = await client.getSigningKey(kid);
      const signingKey = key.getPublicKey();

      jwt.verify(token, signingKey, (err, user) => {
          if (err) return res.sendStatus(403);
          req.user = user;
          next();
      });
  } catch (error) {
      console.error('Error during token verification:', error);
      res.sendStatus(403);
  }
};
app.options('/adminInfo', cors()); 
app.use('/adminInfo', authenticateToken, (req, res) => {
  res.send({
      message: 'Successfully accessed admin info',
      user: req.user
  });
});


// Route to update a user's password
app.put('/updatePassword', async (req, res) => {
  try {
    
    const { username, oldPswrd, newPswrd1 } = req.body;
    console.log(`Attempting to update password for user: ${username}`);

    // Check if user exists and old password matches
    const user = await collection.findOne({ username: username, password: oldPswrd });
    if (!user) {
      res.status(404).send({ message: 'User not found or incorrect old password' });
      return;
    }

   
    const result = await collection.updateOne(
      { username: username, password: oldPswrd },
      { $set: { password: newPswrd1 } }
    );
    console.log(`Update result: ${JSON.stringify(result)}`);

    if (result.modifiedCount === 1) {
      res.status(200).send({ message: 'Password updated successfully' });
    } else {
      res.status(500).send({ message: 'Failed to update password' });
    }
  } catch (error) {
    console.error(`Error occurred while updating the password: ${error.message}`);
    res.status(500).send({ message: 'An error occurred while updating the password' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});


// Delete Account Endpoint
app.post('/deleteAccount', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Attempting to delete account for user: ${username}`);

    const user = await collection.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.password !== password) {
      console.log('Incorrect password');
      return res.status(401).send({ message: 'Incorrect password' });
    }

    const result = await collection.deleteOne({ username });
    console.log(`Delete result: ${JSON.stringify(result)}`);

    if (result.deletedCount === 1) {
      res.status(200).send({ message: 'User deleted successfully' });
    } else {
      res.status(500).send({ message: 'Failed to delete user' });
    }
  } catch (error) {
    console.error(`Error occurred while deleting the user: ${error.message}`);
    res.status(500).send({ message: 'An error occurred while deleting the user' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});