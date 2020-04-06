let path = require('path');
let User = require('../models/user').User;



module.exports.post = function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;


    User.authorize(username, password, function (err, user) {
        if (err) return next(err);

        req.session.user = user._id;

        res.redirect('/game');
    });
};