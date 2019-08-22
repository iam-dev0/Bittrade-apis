'use strict';

var router = require('express').Router();
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('../utils/swagger.json');

router.use('/', swaggerUi.serve);

router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
//# sourceMappingURL=documentation.route.js.map