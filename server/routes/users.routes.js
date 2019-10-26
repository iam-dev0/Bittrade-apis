import express from "express";
import {createUser,userLogin} from '../Validator/users.validator'
import UsersController from '../controllers/users.controller';
import upload from '../multer/user'
import sendUploadToGCS from "../googlecloudservice/user"
const router = express.Router();



/* GET*/
 router.get('/', UsersController.getUsers); //done-doc
 router.get('/:id', UsersController.getUser); //done-doc
 router.get('/address/:id', UsersController.GetAddressData);//done-doc
 router.get('/phone/:id', UsersController.GetPhonesData);//done-doc
 router.get('/contactinfo/:id', UsersController.GetContactInfo);//done-doc
 router.get('/paymentinfo/:id', UsersController.GetPaymentInfo);//done-doc


/*POST */
router.post('/login',userLogin,UsersController.Login);
router.post('/',createUser,UsersController.createUser);
router.post('/address/:id', UsersController.AddAddressData);
router.post('/paymentcard/:id', UsersController.pushPaymentInfo);


/*PUT */
router.put('/uploadimage/:id',upload,sendUploadToGCS,UsersController.UploadImageUser)
router.put('/email/:id', UsersController.editEmail);
router.put('/contactinfo/:id', UsersController.contactInfo);
router.put('/address/:id', UsersController.EditAddressData);
router.put('/phones/:id', UsersController.editPhonesData);
 router.put('/paymentcard/:id/:idcard', UsersController.editPaymentInfo);



module.exports = router;
/** this ends this file
* server/routes/Users.routes
**/
