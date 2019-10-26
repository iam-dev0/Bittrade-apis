import express from 'express';
const router = express.Router();

import checkout from '../controllers/checkout.controller';


router.get('/:id', checkout.createCharge);

module.exports = router;
/** this ends this file*/