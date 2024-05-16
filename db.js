//import mongoose
const mongoose = require('mongoose');

//defining mongodb connection url
//const mongoURL = process.env.MONGODB_URL_LOCA;
const mongoURL = process.env.MONGODB_URL;
//setup mongodb connection
mongoose.connect(mongoURL);


//get default connection
const db = mongoose.connection;


//event listeners
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

//exporting the database connection
module.exports = db;

