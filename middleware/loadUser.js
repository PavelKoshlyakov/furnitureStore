let path = require('path');
let User = require(path.resolve('models', 'user')).User;

module.exports = function (req, res, next) {
    req.user = res.locals.user = null;
    if (!req.session.user) {
        console.log('Сессии нет');
        return next();
    }

    User.findById(req.session.user, function (err, user) {
        if (err) return next(err);
        req.user = res.locals.user = user;  //Доступно всем шаблонам из-за res.locals.user
        next();
    });
};