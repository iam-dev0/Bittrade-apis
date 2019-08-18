'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _require = require('express-validator/check'),
    body = _require.body;

var createUser = exports.createUser = [body('name', 'first_name Cannot be empty').exists(), body('email', 'Please enter a valid email address').exists().isEmail(), body('password', "Password should be at least 6 character long").exists().isLength({ min: 5 })];

var userLogin = exports.userLogin = [body('email', 'Please enter a valid email address').exists().isEmail(), body('password', "Password should be at least 6 character long").exists().isLength({ min: 5 })];
//# sourceMappingURL=users.validator.js.map