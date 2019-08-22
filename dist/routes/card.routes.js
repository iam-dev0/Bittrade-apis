'use strict';

var express = require('express');
var router = express.Router();

var cardController = require('../controllers/card.controller');

router.get('/:id', cardController.getCard);
router.post('/', cardController.addToCard);
router.delete('/', cardController.removeCardProduct);
module.exports = router;
/** this ends this file
* server/routes/clients.routes
**/
//# sourceMappingURL=card.routes.js.map