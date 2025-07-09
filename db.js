const mongoose = require('mongoose');

//define mongoDB connection string
const mongoURL= 'mongodb://localhost:27017/hotel';

//set up mongoose connection
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