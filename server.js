const express = require('express');
const app = express();
const db = require('./db');

const bodyPerser = require('body-parser');
app.use(bodyPerser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my hotel...');
});



const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);



const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);




app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
