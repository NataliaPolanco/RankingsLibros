const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async(email, password, done) => {
    User.findOne({ email: email });
    if (!User) {
        return done(null, false, { message: 'Este usuario no existe' });
    } else {
        const match = await User.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: ' Contraseña incorrecta' })
        }
    }
}));
passport.serializeUser((user, done) => {
    done(null, user.id);

});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})

module.exports = passport