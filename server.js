const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyPerser = require('body-parser');
app.use(bodyPerser.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my hotel...');
});



const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);



const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);



app.listen(PORT, () => {
  console.log('🚀 Server is running on port'+ PORT);
});
