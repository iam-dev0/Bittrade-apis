import express from 'express';
const router = express.Router();

import cardController from '../controllers/card.controller';


router.get('/getproducts/:id', cardController.getCard);
router.post('/',cardController.addToCard)
router.delete('/remove/',cardController.removeCardProduct)
router.put('/incrementproductQuantity',cardController.incrementQuantity)
router.put('/decrementproductQuantity',cardController.decrementQuantity)
module.exports = router;
/** this ends this file
* server/routes/clients.routes
**/
