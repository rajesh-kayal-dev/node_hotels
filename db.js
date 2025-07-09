const mongoose = require('mongoose');
require('dotenv').config();

//const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;


mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

//define event listeners for the connection
db.on('connected', () => {
    console.log('Connected to MongoDb Server');
});
db.on('error', (err) => {
    console.error('Mongoose connection error: ' + err);
});
db.on('disconected', ()=>{
    console.log('object disconnected ');
})

module.exports = db;