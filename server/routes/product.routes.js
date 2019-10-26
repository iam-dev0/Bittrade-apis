import express from "express";
import { check, validationResult } from 'express-validator';
import upload from '../multer/product'
import {createProduct} from '../Validator/product.validator'
import productsController from '../controllers/product.controller'
import sendUploadToGCS from "../googlecloudservice/product"

const router = express.Router();

//Done-documentation
router.get('/', productsController.getProductsPagination);
//Documentation-1
router.post('/:id',upload, createProduct,sendUploadToGCS, productsController.createProduct);

router.post('/favorite/:userid/:productid',productsController.AddFavoriteProduct)
router.get('/favorite/:userid',productsController.GetFavoriteProducts)
router.delete('/favorite/:userid/:productid',productsController.removeFavoriteProduct)
router.get('/search',productsController.searchProduct)


module.exports = router;

/** this ends this file
* server/routes/product.routes
**/
 