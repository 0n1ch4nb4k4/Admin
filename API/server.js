const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const productRouter = require('./routers/router'); // Adjusted path
const { default: mongoose } = require('mongoose');
const app = express();
app.use(cors()); 
app.use(express.json());

const url = 'mongodb+srv://Nhom07:Nhom07VAA@group07.i8yw5.mongodb.net/technology?retryWrites=true&w=majority&appName=Group07';
const dbName = 'technology';

let db; 

// Connect to MongoDB
const connectDB = async () => {
  const client = new MongoClient(url);
  try {
    await mongoose.connect(url)
    // await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

//get all products
app.get('/products', async (req, res) => {
  try {
    const productsCollection = db.collection('product');
    const products = await productsCollection.find().toArray();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


//get category
app.get('/categories', async (req, res) => {
  try {
    const category = db.collection('category');
    const categories = await category.find().toArray();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start the server and connect to MongoDB
const startServer = async () => {
  await connectDB();
  app.listen(3003, () => {
    console.log('Server is running on port 3003');
  });
};

startServer(); 
