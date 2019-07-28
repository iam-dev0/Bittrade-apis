

const express = require('express');
const router = express.Router();
import upload from '../multer/index'
const productsController = require('../controllers/product.controller');

router.get('/', productsController.getProducts);
router.post('/',upload, productsController.createProduct);
// router.get('/count', productsController.getCount);
// router.get('/actives', productsController.getActives);
// router.get('/actives/count', productsController.getActivesCount);
// router.get('/inactives', productsController.getInactives);
// router.get('/inactives/count', productsController.getActivesCount);
// router.get('/brokenstock', productsController.brokenStock);
// router.get('/:id', productsController.getProduct);
// router.get('/activate/:id', productsController.activateProduct);
// router.get('/deactivate/:id', productsController.deactivateProduct);

router.put('/:id', productsController.editProduct);
/*
    send as request body:

    {
        "image": "https://unsplash.com/photos/yC-Yzbqy7PY"
    }
*/
router.put('/addimage/:id', productsController.addImage);



router.delete('/:id', productsController.deleteProduct);

module.exports = router;

/** this ends this file
* server/routes/product.routes
**/
 