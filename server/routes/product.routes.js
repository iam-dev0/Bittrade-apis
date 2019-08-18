const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
import upload from '../multer/index'
import {createProduct} from '../Validator/product.validator'
const productsController = require('../controllers/product.controller');




router.get('/', productsController.getProductsPagination);
router.post('/',upload, createProduct, productsController.createProduct);
router.post('/favorite',productsController.favoriteProduct)
router.get('/favorite/:id',productsController.favoriteProduct)
router.delete('/favorite',productsController.favoriteProduct)
// router.get('/:page', productsController.getProductsPagination);

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
 