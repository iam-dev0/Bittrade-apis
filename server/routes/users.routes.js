
import {createUser,userLogin} from '../Validator/users.validator'

const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controller');

// router.get('/', UsersController.getUsers);
// router.get('/:id', UsersController.getClient);
 router.post('/login',userLogin,UsersController.Login);
 router.post('/',createUser,UsersController.createUser);
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
