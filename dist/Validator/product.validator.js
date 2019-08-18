'use strict';

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _require = require('express-validator/check'),
    body = _require.body;

var createProduct = exports.createProduct = [body('description', 'Disciption Cannot be empty').exists(), body('title', 'Title cannot be empty').exists(), body('price', "Required and it must be a number").exists().isFloat(), body('stock', "Required and it must be a number").exists().isInt()];
//# sourceMappingURL=product.validator.js.map