let path = require('path');
let fs = require('fs');

let express = require('express');
let mongoose = require(path.resolve('lib', 'mongoose.js'));
let http = require('http');

var WebSocketServer = require('websocket').server;

let config = require('./config');
let HttpError = require('./error').HttpError;

let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let errorHandler = require('errorhandler');
let session = require('express-session');

let app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.use('/game', express.static(path.join(__dirname, 'game')));
app.use('/redaction', express.static(path.join(__dirname, 'redaction')));
app.use('/authorization', express.static(path.join(__dirname, 'authorization')));

// app.use(express.serve-favicon());

if (app.get('env') == 'development') {
    app.use(morgan('dev'));
    console.log('env');
} else {
    app.use(morgan('default'));
    console.log('default');
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

let MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'furnitureStore',
    key: 'sid',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(require('./error/sendHttpError'));
app.use(require(path.resolve('middleware/loadUser')));

// app.use(app.router);

require('./routes')(app);


app.use(function (err, req, res, next) {
    console.log(err.message);
    if (typeof err == 'number') {
        console.log('number');
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            console.log('++');
            errorHandler()(err, req, res, next);
        } else {
            console.log('--');
            console.log('ERROR: ' + err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

// http.createServer(app).listen(3000, function () {
//     console.log('Server listen on port ' + 3000);
// });

let expressWs = require('express-ws')(app);

app.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
    });
    console.log('socket', req.testing);
});

let server = http.createServer(app);
server.listen(3000, function () {
    console.log('Server listen on port ' + 3000);
});

// создадим сервер
let wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket-сервер
wsServer.on('request', function (request) {
    let connection = request.accept(null, request.origin);

    // Это - самый важный для нас коллбэк, где обрабатываются
    // сообщения от клиента.
    connection.on('message', function (message) {
            let mes = JSON.parse(message.utf8Data);

            // console.log(mes);
            if (mes.operation == "create") {
                let json2xml = require(path.resolve("redaction", "json2xml.js"));
                json2xml.seller(message, path.resolve("game", "DialogList", "step" + mes.xmlNumber + ".xml"));
                json2xml.customer(message, path.resolve("game", "DialogList", "step" + mes.xmlNumber + ".xml"));
            }

            if (mes.operation == "delete") {
                let del = require(path.resolve("redaction", "delete.js"));
                console.log("ID ", mes.id);

                if (mes.type == "seller") {
                    del.seller(mes.id, path.resolve("game", "DialogList", "step" + mes.xmlNumber + ".xml"));
                }
                if (mes.type == "customer") {
                    del.customer(mes.id, path.resolve("game", "DialogList", "step" + mes.xmlNumber + ".xml"))
                }
            }

            if (mes.operation == "redaction") {
                console.log(mes);
                connection.send(JSON.stringify({
                    width: mes.width,
                    height: mes.height
                }));
            }

            if (mes.operation == "image_background") {
                let mongodb = require('mongodb');
                let mongoClient = mongodb.MongoClient;
                let binary = mongodb.Binary;
                let buffer;

                mongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, function (err, client) {
                    if (err) {
                        return err
                    }
                    else {
                        let db = client.db('furnitureStore');
                        let collection = db.collection('image_background');

                        collection.find({name: mes.username}).toArray(function (err, doc) {
                            if (err) {
                                console.log('err in finding doc:', err)
                            }
                            else {
                                buffer = doc[0].file;
                                connection.send(JSON.stringify({
                                    operation: "image_background",
                                    buffer: buffer
                                }));
                            }
                        });

                        client.close();
                    }

                });
            }
            if (mes.operation == "size") {

                let mongodb = require('mongodb');
                let mongoClient = mongodb.MongoClient;
                let binary = mongodb.Binary;
                let buffer;

                mongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, function (err, client) {
                    if (err) {
                        return err
                    }
                    else {

                        let db = client.db('furnitureStore');
                        let collection = db.collection('image_background');
                        try {
                            collection.update({name: mes.username}, {
                                $set: {
                                    width: mes.width,
                                    height: mes.height
                                }
                            });
                        }
                        catch (err) {
                            console.log('Error while updating:', err);
                        }


                        collection.find({name: mes.username}).toArray(function (err, doc) {
                            if (err) {
                                console.log('err in finding doc:', err)
                            }
                            else {
                                console.log("send SIZE");
                                try {
                                    connection.send(JSON.stringify({
                                        operation: "size",
                                        width: doc[0].width,
                                        height: doc[0].height
                                    }));
                                }
                                catch (err) {
                                    console.log('Error while sending SIZE:', err);
                                }

                            }
                        });
                    }
                });

            }

            if (mes.operation == "game_size") {
                let mongodb = require('mongodb');
                let mongoClient = mongodb.MongoClient;
                mongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, function (err, client) {
                    if (err) {
                        return err
                    }
                    else {

                        let db = client.db('furnitureStore');
                        let collection = db.collection('image_background');
                        collection.find({name: mes.username}).toArray(function (err, doc) {
                            if (err) {
                                console.log('err in finding doc:', err)
                            }
                            else {
                                console.log("send SIZE");
                                try {
                                    connection.send(JSON.stringify({
                                        operation: "game_size",
                                        width: doc[0].width,
                                        height: doc[0].height
                                    }));
                                }
                                catch (err) {
                                    console.log('Error while sending SIZE:', err);
                                }

                            }
                        });
                    }
                })
            }

            if (mes.operation == "test") {
                connection.send(JSON.stringify({
                    operation: "test",
                    text: "test"
                }));
            }

        }
    );

    connection.on('close', function (connection) {
        // Закрытие соединения
    });
});