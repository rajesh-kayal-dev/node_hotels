const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Import routes
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Passport setup
const passport = require('./auth');
app.use(passport.initialize());
const LocalStrategyMiddleware = passport.authenticate('local', { session: false });

// Logging middleware
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Method: ${req.originalUrl}`);
  next();
};
app.use(logRequest);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to my hotel...');
});

// Login route
app.post('/login', LocalStrategyMiddleware, (req, res) => {
  res.status(200).json({ message: 'Login successful', user: req.user });
});

// Other routes
app.use('/person',LocalStrategyMiddleware, personRoutes);
app.use('/menu',  menuRoutes);

// Start server
app.listen(PORT, () => {
  console.log('🚀 Server is running on port ' + PORT);
});
