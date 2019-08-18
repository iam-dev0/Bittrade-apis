const express = require('express');
const router = express.Router();

const cardController = require('../controllers/card.controller');


router.get('/:id', cardController.getCard);
router.post('/',cardController.addToCard)
router.delete('/',cardController.removeCardProduct)
module.exports = router;
/** this ends this file
* server/routes/clients.routes
**/
