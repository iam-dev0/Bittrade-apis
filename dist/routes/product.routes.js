'use strict';

var _index = require('../multer/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

var productsController = require('../controllers/product.controller');

router.get('/', productsController.getProducts);
router.post('/', _index2.default, productsController.createProduct);
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