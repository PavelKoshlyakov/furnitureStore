let mongoose = require('mongoose');
let config = require('../config');

mongoose.connect("mongodb://localhost:27017/furnitureStore", {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
// mongoose.connect("mongodb://localhost/furnitureStore");

module.exports = mongoose;