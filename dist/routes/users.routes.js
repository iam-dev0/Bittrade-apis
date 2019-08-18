'use strict';

var _users = require('../Validator/users.validator');

var express = require('express');
var router = express.Router();

var UsersController = require('../controllers/users.controller');

// router.get('/', UsersController.getUsers);
// router.get('/:id', UsersController.getClient);
router.post('/login', _users.userLogin, UsersController.Login);
router.post('/', _users.createUser, UsersController.createUser);
// router.post('/email/:id', UsersController.pushEmails);
// router.post('/address/:id', UsersController.pushAddresses);
// router.post('/phone/:id', UsersController.pushPhones);
// router.post('/paymentcard/:id', UsersController.pushPaymentCard);


// router.put('/:id', UsersController.editUsersimpleData);
// router.put('/email/:id/:email', UsersController.editEmailsData);
// router.put('/address/:id/:address', UsersController.editAddressData);
// router.put('/phones/:phone', UsersController.editPhonesData);
// router.put('/paymentcard/:id/:idcard', UsersController.editPaymentCard);

// router.delete('/email/:id/:email', UsersController.deleteEmails);
// router.delete('/address/:id/:address', UsersController.deleteAddresses);
// router.delete('/phone/:id/:phone', UsersController.deletePhones);
// router.delete('/:id',UsersController.deleteClient);
// router.delete('/paymentcard/:id/:idcard', UsersController.deletePaymentCard);

module.exports = router;
/** this ends this file
* server/routes/Users.routes
**/
//# sourceMappingURL=users.routes.js.map