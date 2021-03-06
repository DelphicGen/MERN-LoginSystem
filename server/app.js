require('dotenv').config();
const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const initializePassport = require('./passport-config.js');
const authRoutes = require("./routes/authRoutes");
const channelRoutes = require('./routes/channelRoutes');
const chatRoutes = require('./routes/chatRoutes');
const User = require('./models/user');

mongoose.connect('mongodb://localhost/chatapp', 
{ useNewUrlParser: true, useUnifiedTopology: true }, 
() => {
    console.log("Mongoose Is Connected");
});
mongoose.Promise = global.Promise;

initializePassport(passport, (username) => {
    return User.findOne({ username: username }, (err, user) => {
        return user
    })
}, id => {
    return User.findById({ _id: id }, (err, user) => {
        return user
    })
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
);
app.use(flash());
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 3600000 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/auth', authRoutes);
app.use('/api/channel', channelRoutes);
app.use('/api/user', chatRoutes);
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
});
app.listen(process.env.PORT || 3050);