const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const [checkAuthenticated, checkNotAuthenticated] = require('../functions/functions');

router.post('/register', checkNotAuthenticated, function(req, res, next) {
    User.findOne({ username: req.body.username })
        .then(async (records) => {
            if(records) {
                res.send('Username is taken')
            } else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                User.create({username: req.body.username, password: hashedPassword})
                    .then(function(record) {
                        res.send(record);
                    })
                    .catch(next);
            }
        })
});

router.post('/login', checkNotAuthenticated,function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
          req.flash('error', info.message);
          return res.send(info)
        }
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.send(info)
        });
      })(req, res, next);
});

module.exports = router;