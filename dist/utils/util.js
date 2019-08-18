'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myValidationResult = undefined;

var _expressValidator = require('express-validator');

var myValidationResult = exports.myValidationResult = _expressValidator.validationResult.withDefaults({
  formatter: function formatter(error) {
    return {
      msg: error.msg,
      param: error.param
    };
  }
});
//# sourceMappingURL=util.js.map