'use strict';

var express = require('express');
var router = express.Router();

var suppliersController = require('../controllers/suppliers.controller');

router.get('/', suppliersController.getSuppliers);
router.get('/:id', suppliersController.getSupplier);

router.post('/', suppliersController.createSupplier);

router.delete('/:id', suppliersController.deleteSupplier);

router.put('/:id', suppliersController.editSupplier);

module.exports = router;

/** this ends this file
* server/routes/suppliers.routes
**/