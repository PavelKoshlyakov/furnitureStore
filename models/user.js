let path = require('path');
let crypto = require('crypto');
let HttpError = require('../error').HttpError;
let async = require('async');
let sendMail = require(path.resolve('middleware', 'sendMail'));

let mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

let schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    validEmail:{
      type: Boolean
    },
    token: {
        type: String,
        unique: true
    },
    //Защита пароля
    hashedPassword: {
        type: String,
        // required: true
    },
    salt: {
        type: String,
        // required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

schema.methods.encryptPassword = function(password){
    console.log('password ' + password);
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.statics.authorize = function(username, password, callback){
    let User = this;
    async.waterfall([
        function(callback){
        console.log('1');
            User.findOne({username: username}, callback);
        },
        function(user, callback){
        console.log('2');
            if (user){
                if (user.validEmail == true){
                    if (user.checkPassword(password)){
                        callback(null, user);
                        console.log("Email подтверждён");
                    } else{
                        callback(new HttpError(403, "Пароль неверен"));

                    }
                } else{
                    callback(new HttpError(403, "Email не подтверждён"));
                    console.log("Email не подтверждён");
                }
            } else{
                callback(new HttpError(403, "Пользователь не найден"), null);
            }
        }
    ], callback);
};

schema.statics.registration = function(email, username, password, passwordDouble, callback){
    let User = this;
    async.waterfall([
        function(callback){
            User.findOne({username: username}, callback);
        },
        function(user, callback){
            if (user){
                callback(new HttpError(403, "Имя занято"));
            } else{
                if (password == passwordDouble){

                    let emailToken = sendMail(email);
                    let user = new User({username: username, password: password, email: email, token: emailToken, validEmail: false});
                    user.save(function (err) {
                        if (err) return callback(err);
                        callback(null);
                        console.log('GOOD');
                    });

                } else {
                    console.log('BAD');
                    callback(new HttpError(403, "Пароли не совпадают"));
                }
            }
        }
    ], callback(null));
};

//Виртуальное поле
schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () { return this._plainPassword;});

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model('User', schema);