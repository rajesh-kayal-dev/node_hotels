const passport = require('passport');
const Person = require('./models/person');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    console.log('Received credentials:', { username, password });

    const user = await Person.findOne({ username: username });

    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'Incorrect username' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (isPasswordValid) {
      return done(null, user);
    } else {
      console.log('Incorrect password');
      return done(null, false, { message: 'Incorrect password' });
    }

  } catch (error) {
    console.error('Error during authentication:', error);
    return done(error);
  }
}));


module.exports = passport;