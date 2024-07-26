const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");
const { auth } = require('express-oauth2-jwt-bearer');
const jwt = require('jsonwebtoken');
const authConfig = require("./auth_config.json");



const app = express();
const port = 3001;

//const appOrigin =`http://localhost:3000`;

/*
if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "http://localhost:3000/authn"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}
*/

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

//app.use(cors({ origin: appOrigin }));

const url = 'mongodb://127.0.0.1:27017/';
const databasename = 'users';

let db, collection;


app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP to avoid conflicts with Auth0
  frameguard: { action: 'deny' }, // Adjust as necessary
  noSniff: true,
  xssFilter: true,
  hidePoweredBy: true,
}));




const checkJwt = auth({
  audience: 'http://localhost:3000/authn',
  issuerBaseURL: 'https://dev-e2oe1td2rrqxwxie.jp.auth0.com/',
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});





MongoClient.connect(url)
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

    // Update the user's password
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