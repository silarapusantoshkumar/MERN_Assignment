const express = require('express');
const mongoose = require('mongoose');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 5010;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://santosh:mern%402024@root.wzzcw9k.mongodb.net/Users-Data?retryWrites=true&w=majority&appName=root', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas', err);
});

// Define schema and model for the resources
const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon_url: { type: String, required: true },
  link: { type: String, required: true },
  tag: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);

// Route to fetch data and save to MongoDB Atlas
 app.get('/fetch-and-save', async (req, res) => {
  try {
    const response = await fetch('https://media-content.ccbp.in/website/react-assignment/resources.json');
    const data = await response.json();
    
    // Check and log the structure of the fetched data
    console.log('Fetched data:', data);

    // Save data to MongoDB
    const result = await Resource.insertMany(data);
    console.log('Inserted documents:', result);

    res.send('Data saved to MongoDB Atlas');
  } catch (err) {
    console.error('Error fetching and saving data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get all data from MongoDB Atlas
  app.get('/get-all-data', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
        res.json(resources);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to save form data to MongoDB Atlas
app.post('/formdata', async (req, res) => {
  const { title, icon_url, link, tag, category, description } = req.body;

  try {
      const newResource = new Resource({
          title,
          icon_url,
          link,
          tag,
          category,
          description
      });

      const savedResource = await newResource.save();

      console.log('Saved Resource:', savedResource); // Log the saved resource to check `createdAt`

      res.json(savedResource);
  } catch (err) {
      console.error('Error saving form data:', err);
      res.status(500).send('Server error');
  }
});



// server listeninng to the port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
