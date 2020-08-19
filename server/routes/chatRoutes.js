const express = require('express');
const router = express.Router();

const [checkAuthenticated, checkNotAuthenticated] = require('../functions/functions');

router.get('/test', checkAuthenticated, function(req, res, next) {
    res.send('Hello')
});


module.exports = router;