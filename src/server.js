const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const cors = require('cors');
const fs = require('fs').promises; // for file operations
const bcrypt = require('bcrypt');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3001;


// Connection URL and database name
const url = 'mongodb://localhost:27017/';
const dbName = 'social-media';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// In-memory storage for tokens (replace this with a database in a production environment)
let tokens = [];

app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Verify the token
    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      req.user = user;
      next();
    });
  };
  

// Signup endpoint
app.post('/api/signup', upload.single('profileImage'), async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('login');

    // Extract user data from the request body
    const { username, email, password, profileImage } = req.body;

    // Check if the username already exists
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    console.log(profileImage);
    console.log(req);
    //profileImage = req.body.profileImage);
    console.log(req.files);
    console.log(req.path);
    console.log(req.file);
    console.log(req.file.path);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    console.log()

    //await profileImage.mv(path.join(__dirname, 'uploads', fileName));
    // Create a new user with the hashed password
    const newUser = {
      username,
      email,
      password: hashedPassword,
      profileImage: req.file ? req.file.originalname : null,
    };

    // Save the new user to the collection
    await collection.insertOne(newUser);

    if (req.file) {
        const originalPath = req.file.path;
        const destinationPath = `./uploads/${req.file.originalname}`;
  
        await fs.copyFile(originalPath, destinationPath);
  
        // You can delete the original file if needed
      }
    res.status(200).json({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('login');

    const user = await collection.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password.toString(), user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, 'your_secret_key', {
      expiresIn: '1h',
    });

    // Store the token in the array
    tokens.push(token);
    
    res.json({ token, profileImage: user.profileImage });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
});

// Logout endpoint
app.post('/api/logout', async (req, res) => {
    
    console.log(req.headers);
  //const token = req.headers.authorization;
  //console.log("asdasd"+token);
  // Check if the token is valid
  console.log(tokens[0]);
  
  const token = tokens[0];
//   if (!tokens.includes(token)) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

  // Remove the token from the in-memory storage
  tokens = tokens.filter((t) => t !== token);

  res.json({ message: 'Logout successful' });
  console.log("new  "+token);
});

// app.get('/api/user', authenticateToken, async (req, res) => {
//     try {
//       await client.connect();
  
//       const db = client.db(dbName);
//       const collection = db.collection('login');
  
//       // Find the user using the decoded user ID from the token
//       const user = await collection.findOne({ _id: ObjectId(req.user.userId) });
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Send the user data in the response
//       res.json({
//         username: user.username,
//         email: user.email,
//         // Add other user properties as needed
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     } finally {
//       await client.close();
//     }
//   });
// app.get('/api/user', authenticateToken, async (req, res) => {
//     try {
//       await client.connect();
  
//       const db = client.db(dbName);
//       const collection = db.collection('login');
  
//       // Find the user using the decoded user ID from the token
//       const user = await collection.findOne({ _id: ObjectId(req.user.userId) });
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       console.log('User Data:', {
//         username: user.username,
//         email: user.email,
//         // Add other user properties as needed
//       });
//       // Send the user data in the response
//       res.json({
//         username: user.username,
//         email: user.email,
//         // Add other user properties as needed
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     } finally {
//       await client.close();
//     }
//   });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
