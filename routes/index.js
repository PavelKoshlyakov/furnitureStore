let path = require('path');
let fs = require('fs');

let User = require('../models/user').User;
let HttpError = require('../error').HttpError;
let sendMail = require(path.resolve('middleware', 'sendMail'));

let mongoose = require('../lib/mongoose');
let fileUpload = require('express-fileupload');
let mongodb = require('mongodb');
let mongoClient = mongodb.MongoClient;
let binary = mongodb.Binary;

// let buffer;
// let WebSocketServer = require('websocket').server;

module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.render('frontpage');
    });

    app.get('/login', function (req, res) {
        res.render('login');
    });

    app.post('/login', require(path.resolve('routes', 'login')).post);

    let User = require('../models/user').User;
    app.get('/users', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) return next(err);
            // res.json(users);

            res.render('users', {users: users});
        })
    });

    app.get('/user/:id', function (req, res, next) {
        User.findById(req.params.id, function (err, user) {
            if (err) return next(err);
            if (!user) {
                console.log('ID not found');
                next(new HttpError(404, "User not found"));
            }
            res.json(user);
        });
    });

    app.post('/logout', function (req, res) {
        console.log('LOGOUT');
        req.session.destroy();
        res.redirect('/');
        console.log('--------------------------------------------------');

        // res.send('LOGOUT');
    });

    app.get('/registration', function (req, res) {
        res.render('registration');
    });

    app.post('/registration', function (req, res, next) {
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let passwordDouble = req.body.passwordCheck;
        console.log(req.body);
        console.log(email + ' ' + username + ' ' + password + ' ' + passwordDouble);

        User.registration(email, username, password, passwordDouble, function (err) {
            if (err) return next(err);

            res.redirect('/login');
        });


        console.log('--------------------------------------------------');
    });

    app.get('/game', function (req, res) {
        res.render('game');
    });

    //Принимаем запрос подтверждения регистрации
    app.get('/confirm/:token', function (req, res, next) {
        let username;

        User.findOne({token: req.params.token}, function (err, users) {

            User.updateMany({token: req.params.token}, {
                token: "",
                validEmail: true
            }, {new: true}, function (err, user) {

                if (err) return console.log(err);
                console.log("Обновленный объект", user);

                //Создание базы для редактирования игры
                let file = {
                    // name: req.user.username
                    name: users.username
                };
                mongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, function (err, client) {
                    if (err) {
                        return err
                    }
                    else {
                        //Если у пользователя изображение уже загружено, то удаляем его
                        if (client.db("furnitureStore").collection("image").findOne({name: users.username})) {
                            client.db("furnitureStore").collection("image").deleteMany({name: users.username});
                        }
                        let db = client.db('furnitureStore');
                        let collection = db.collection('image_background');
                        try {
                            collection.insertOne(file);
                            // console.log('File Inserted');
                        }
                        catch (err) {
                            // console.log('Error while inserting:', err);
                        }
                    }
                });

                res.redirect('/');
            });
        });

        // res.redirect('/');
    });

    //Удаление пользователя
    app.get('/deleteUser/:id', function (req, res, next) {
        User.findById(req.params.id, function (err, user) {
            if (err) return console.log(err);
            if (!user) {
                next(new HttpError(404, "User not found"));
            } else {
                User.findOne({username: user.username}).deleteOne().exec();
            }

        });
        res.redirect('/users');
    });

    app.get('/dialogRedaction/newXML', require(path.resolve('routes', 'newXML.js')).create);   //Создаём новый файл XML
    app.get('/dialogRedaction/deleteXML/:id', require(path.resolve('routes', 'newXML.js')).delete);   //Удаляем указанную XML

    app.get('/dialogRedaction/:idStep', require(path.resolve('routes', 'dialogRedaction')).get);

    app.get('/gameBuilder', function (req, res, next) {
        res.render('gameBuilder');
    });

    app.use(fileUpload());

    //Сохранение изображения для фона картинки
    app.post('/upload', function (req, res) {
        let file = {
            name: req.user.username,
            // width:
            file: binary(req.files.uploadedFile.data)
        };
        console.log(req.body);
        mongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, function (err, client) {

            if (err) {
                return err
            }
            else {
                //Если у пользователя изображение уже загружено, то удаляем его
                if (client.db("furnitureStore").collection("image_background").findOne({name: req.user.username})) {
                    client.db("furnitureStore").collection("image_background").deleteMany({name: req.user.username});
                }
                let db = client.db('furnitureStore');
                let collection = db.collection('image_background');
                try {
                    collection.insertOne(file);
                    console.log('File Inserted');
                }
                catch (err) {
                    console.log('Error while inserting:', err);
                }

                // client.db("furnitureStore").collection("image_background").findOne(function (err, doc) {
                //
                //     // console.log(doc);
                //     client.close();
                // });

                // collection.find({}).toArray(function (err, doc) {
                //     if (err) {
                //         console.log('err in finding doc:', err)
                //     }
                //     else {
                //         buffer = doc[0].file.buffer;
                //         fs.writeFileSync(req.user.username + '.jpg', buffer)
                //     }
                // });

                client.close();

                res.redirect('/gameBuilder');
            }

        })
    });

    app.use(function (req, res, next) {
        res.status(404).send();
        // res.status(404).send();
    });
};