'use strict';

var _index = require('../multer/index');

var _index2 = _interopRequireDefault(_index);

var _product = require('../Validator/product.validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var productsController = require('../controllers/product.controller');

router.get('/', productsController.getProductsPagination);
router.post('/', _index2.default, _product.createProduct, productsController.createProduct);
router.post('/favorite', productsController.AddFavoriteProduct);
router.get('/favorite/:id', productsController.GetFavoriteProducts);
router.delete('/favorite', productsController.removeFavoriteProduct);
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
//# sourceMappingURL=product.routes.js.map