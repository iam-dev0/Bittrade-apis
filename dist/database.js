'use strict';

var _config = require('../config/config');

var mongoose = require('mongoose');

mongoose.connect(_config.URI, {
    useNewUrlParser: true
}).then(function (db) {
    return console.log(_config.URI + ' is connected');
}).catch(function (err) {
    return console.log('Error en Mongo: ' + err);
});

module.exports = mongoose;