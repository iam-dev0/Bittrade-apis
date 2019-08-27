import express from 'express';
const router = express.Router();

import cardController from '../controllers/card.controller';


router.get('/:id', cardController.getCard);
router.post('/',cardController.addToCard)
router.delete('/',cardController.removeCardProduct)
module.exports = router;
/** this ends this file
* server/routes/clients.routes
**/
